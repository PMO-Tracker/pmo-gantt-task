import React, { useEffect, useState } from "react";
import { CalendarRanges, DateSetup } from "../../types/date-setup";
import {
  PICadenceData,
  ProgramIncrementData,
  MidRangeData,
} from "../../types/public-types";
import styles from "./pi-cadence-header.module.css";

export type PICadenceHeaderProps = {
  fontFamily: string;
  fontSize: string;
  width: number;
  height: number;
  backgroundColor: string;
  calendarRanges: CalendarRanges;
  dateSetup: DateSetup;
  columnWidth: number;
  piCadence: PICadenceData[];
  headerHeight: number;
};

export const PICadenceHeader: React.FC<PICadenceHeaderProps> = ({
  fontSize,
  fontFamily,
  width,
  height,
  backgroundColor,
  calendarRanges: { ranges = {} },
  dateSetup: { dates },
  columnWidth,
  piCadence,
  headerHeight,
}) => {
  const [programIncrementData, setProgramIncrementData] = useState<
    ProgramIncrementData[]
  >([]);

  useEffect(() => {
    let midRanges: Record<string, MidRangeData> = {};
    let tickX = 0;
    const updatedPIData: ProgramIncrementData[] = [];

    for (const [sprint, dates] of Object.entries(ranges)) {
      const { startDate, endDate } = dates;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const midRange = new Date(
        (end as any) - ((end as any) - (start as any)) / 2
      );
      const midRangeTime = new Date(
        midRange.getFullYear(),
        midRange.getMonth(),
        midRange.getDate()
      ).getTime();
      midRanges[midRangeTime] = {
        date: midRange,
        sprint,
      };
    }

    for (let i = 0; i < dates.length; i++) {
      tickX += columnWidth;
      const currentDateTime = new Date(
        dates[i].getFullYear(),
        dates[i].getMonth(),
        dates[i].getDate()
      ).getTime();
      const matchedDateRange = midRanges[currentDateTime];
      if (!matchedDateRange) continue;

      const { sprint } = matchedDateRange;
      let currentTickX = tickX;
      piCadence.forEach(
        ({
          programIncrement,
          firstSprintOfProgramIncrement,
          numberOfSprints,
        }) => {
          const matchingSprint = Array.from(
            { length: numberOfSprints },
            (_, j) =>
              `Sprint ${
                parseInt(firstSprintOfProgramIncrement.split(" ")[1]) + j
              }`
          );
          if (matchingSprint.includes(sprint)) {
            updatedPIData.push({ programIncrement, tickX: currentTickX });
          }
        }
      );
    }
    setProgramIncrementData(updatedPIData);
  }, [ranges, dates, piCadence, columnWidth]);

  return (
    <g fontSize={fontSize} fontFamily={fontFamily}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{ fill: backgroundColor }}
      />
      {programIncrementData.map(({ programIncrement, tickX }) => {
        return (
          <text
            y={headerHeight * 0.32}
            x={tickX}
            className={styles.piCadenceTitle}
          >
            {programIncrement}
          </text>
        );
      })}
    </g>
  );
};
