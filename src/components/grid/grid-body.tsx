import React, { ReactChild, useEffect, useState} from "react";
import { Task, ViewMode } from "../../types/public-types";
// import { addToDate } from "../../helpers/date-helper";
import styles from "./grid.module.css";
import { CalendarRanges } from "../../types/date-setup";
import { addDatesToSet } from "../../helpers/other-helper";

export type GridBodyProps = {
  tasks: Task[];
  dates: Date[];
  svgWidth: number;
  rowHeight: number;
  columnWidth: number;
  todayColor: string;
  alternateShadeColor: string;
  currentShadeColor: string;
  rtl: boolean;
  onStageRowClick?: (item: Task) => void;
  calendarRanges: CalendarRanges;
  viewMode: ViewMode;
};
export const GridBody: React.FC<GridBodyProps> = ({
  tasks,
  dates,
  rowHeight,
  svgWidth,
  columnWidth,
  onStageRowClick,
  calendarRanges: {ranges={}}={},
  alternateShadeColor,
  currentShadeColor,
  viewMode,
  // todayColor,
  // rtl,
}) => {
  const [alternateDateSet, setAlternateDateSet] = useState(new Set());
  const [currentCadenceDateSet, setCurrentCadenceDateSet] = useState(new Set());

  let y = 0;
  const gridRows: ReactChild[] = [];
  const rowLines: ReactChild[] = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={svgWidth}
      y2={0}
      className={styles.gridRowLine}
    />,
  ];

  const handleOnStageRowClick = (task: Task) => {
    if (onStageRowClick) {
      onStageRowClick(task)
    }
  };

useEffect(() => {
  const dateSet = new Set();
  const rangeList = Object.values(ranges);
  const currentDate = new Date();
  const currentDateSet = new Set();

  if (viewMode === ViewMode.Range && rangeList.length > 0) {
    rangeList.forEach((sprint, index) => {
      const start = new Date(sprint.startDate);
      const end = new Date(sprint.endDate);

      // Condition for alternative sprints (index % 2 === 0)
      if (index % 2 === 0) {
        addDatesToSet(start, end, dateSet);
      }

      // Condition for the current sprint (current date falls within the sprint range)
      if (currentDate >= start && currentDate <= end) {
        addDatesToSet(start, end, currentDateSet);
      }
    });

    setAlternateDateSet(dateSet); // State for alternative sprints
    setCurrentCadenceDateSet(currentDateSet); // State for the current sprint
  }

}, [ranges,viewMode]);

  for (const task of tasks) {
    gridRows.push(
      <rect
        key={"Row" + task.id}
        x="0"
        y={y}
        width={svgWidth}
        height={rowHeight}
        className={styles.gridRow}
        cursor="pointer"
        onClick={() => handleOnStageRowClick(task)}
      />
    );
    rowLines.push(
      <line
        key={"RowLine" + task.id}
        x="0"
        y1={y + rowHeight}
        x2={svgWidth}
        y2={y + rowHeight}
        className={styles.gridRowLine}
      />
    );
    y += rowHeight;
  }

  // const now = new Date();
  let tickX = 0;
  const ticks: ReactChild[] = [];
  const sprintTick: ReactChild[] = [];
  let isAlternateCadence = false;
  let isCurrentCadence = false;
  // let today: ReactChild = <rect />;
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    ticks.push(
      <line
        key={date.getTime()}
        x1={tickX}
        y1={0}
        x2={tickX}
        y2={y}
        className={styles.gridTick}
      />
    );
  isAlternateCadence = alternateDateSet.has(date.getTime())
  isCurrentCadence = currentCadenceDateSet.has(date.getTime())
    
  if (viewMode === ViewMode.Range && (isAlternateCadence || isCurrentCadence)) {
   sprintTick.push(<rect
    x={tickX}
    y={0}
    width={columnWidth}
    height={y}
    fill={isCurrentCadence ? currentShadeColor : alternateShadeColor}
  />)
  }

    // if (
    //   (i + 1 !== dates.length &&
    //     date.getTime() < now.getTime() &&
    //     dates[i + 1].getTime() >= now.getTime()) ||
    //   // if current date is last
    //   (i !== 0 &&
    //     i + 1 === dates.length &&
    //     date.getTime() < now.getTime() &&
    //     addToDate(
    //       date,
    //       date.getTime() - dates[i - 1].getTime(),
    //       "millisecond"
    //     ).getTime() >= now.getTime())
    // ) {
    //   today = (
    //     <rect
    //       x={tickX}
    //       y={0}
    //       width={columnWidth}
    //       height={y}
    //       fill={todayColor}
    //     />
    //   );
    // }
    // rtl for today
    // if (
    //   rtl &&
    //   i + 1 !== dates.length &&
    //   date.getTime() >= now.getTime() &&
    //   dates[i + 1].getTime() < now.getTime()
    // ) {
    //   today = (
    //     <rect
    //       x={tickX + columnWidth}
    //       y={0}
    //       width={columnWidth}
    //       height={y}
    //       fill={todayColor}
    //     />
    //   );
    // }
    tickX += columnWidth;
  }
  return (
    <g className="gridBody">
      <g className="rows">{gridRows}</g>
      <g className="rowLines">{rowLines}</g>
      <g className="ticks">{ticks}</g>
      <g className="today">{sprintTick}</g>
      {/* <g className="today">{today}</g> */}
    </g>
  );
};
