import React, { useEffect, useState } from "react";
import { DateSetup } from "../../types/date-setup";
import { ViewMode } from "../../types/public-types";
import { PICadenceData, ProgramIncrementData } from "../../types/public-types";
import styles from "./pi-cadence-header.module.css";

export type PICadenceHeaderProps = {
  fontFamily: string;
  fontSize: string;
  width: number;
  height: number;
  backgroundColor: string;
  dateSetup: DateSetup;
  columnWidth: number;
  piCadence: PICadenceData[];
  headerHeight: number;
  viewMode: ViewMode;
};

export const PICadenceHeader: React.FC<PICadenceHeaderProps> = ({
  fontSize,
  fontFamily,
  width,
  height,
  backgroundColor,
  dateSetup: { dates },
  columnWidth,
  piCadence,
  headerHeight,
  viewMode,
}) => {
  const [programIncrementData, setProgramIncrementData] = useState<
    ProgramIncrementData[]
  >([]);

  const getDateRange = (currentDate: Date, viewMode: ViewMode) => {
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    if (viewMode === ViewMode.Week) {
      endDate.setDate(endDate.getDate() + 6);
    } else if (viewMode === ViewMode.Month) {
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
    }

    return { startDate, endDate };
  };

  useEffect(() => {
    let tickX = 0;
    const piData: Record<
      string,
      { programIncrementName: string; tickx: number[] }
    > = {};

    dates.forEach(date => {
      const currentDate = new Date(date);
      tickX += columnWidth;

      const { startDate: currentStart, endDate: currentEnd } = getDateRange(
        currentDate,
        viewMode
      );

      const overlappingProgramIncrements = piCadence
        .filter(({ piStartDate, piEndDate }) => {
          const startDate = new Date(piStartDate);
          const endDate = new Date(piEndDate);

          return startDate <= currentEnd && endDate >= currentStart;
        })
        .map(({ programIncrementName }) => programIncrementName);

      if (overlappingProgramIncrements.length > 0) {
        const piName = overlappingProgramIncrements.join(",");
        if (!piData[piName]) {
          piData[piName] = { programIncrementName: piName, tickx: [] };
        }
        piData[piName].tickx.push(tickX);
      }
    });

    const result = Object.values(piData).map(
      ({ programIncrementName, tickx }) => ({
        programIncrementName,
        tickx,
        firstTick: tickx[0],
        lastTick: tickx[tickx.length - 1],
        avgTick: tickx.reduce((sum, val) => sum + val, 0) / tickx.length,
      })
    );

    setProgramIncrementData(result);
  }, [dates, piCadence, columnWidth, viewMode]);

  return (
    <g fontSize={fontSize} fontFamily={fontFamily}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{ fill: backgroundColor }}
      />
      {programIncrementData.map(
        ({ programIncrementName, avgTick, firstTick, lastTick, tickx }) => {
          return (
            <React.Fragment>
              <line
                x1={firstTick - columnWidth}
                y1={0}
                x2={firstTick - columnWidth}
                y2={headerHeight * 0.5}
                className={styles.piCadenceBorderLine}
                key={firstTick - columnWidth}
                strokeWidth={2}
              />
              <text
                y={headerHeight * 0.32}
                x={tickx.length > 1 ? avgTick : firstTick - columnWidth}
                className={styles.piCadenceTitle}
              >
                {programIncrementName}
              </text>
              <line
                x1={lastTick}
                y1={0}
                x2={lastTick}
                y2={headerHeight * 0.5}
                className={styles.piCadenceBorderLine}
                key={lastTick}
                strokeWidth={2}
              />
            </React.Fragment>
          );
        }
      )}
    </g>
  );
};
