import React, { useRef, useEffect } from "react";
import { GridProps, Grid } from "../grid/grid";
import { CalendarProps, Calendar } from "../calendar/calendar";
import { TaskGanttContentProps, TaskGanttContent } from "./task-gantt-content";
import styles from "./gantt.module.css";
import { PICadenceData, TableMilestones, Task } from "../../types/public-types";
import { Milestones } from "./milestones";
import {
  PICadenceHeaderProps,
  PICadenceHeader,
} from "../pi-cadence/pi-cadence-header";

export type TaskGanttProps = {
  gridProps: GridProps;
  calendarProps: CalendarProps;
  barProps: TaskGanttContentProps;
  ganttHeight: number;
  scrollY: number;
  milestones: TableMilestones[];
  onMilestoneClick: (item: TableMilestones) => void;
  onArrowDoubleClick?: (taskFrom: Task, taskTo: Task) => void;
  piCadenceHeaderHeight: number;
  piCadenceHeaderBackgroundColor: string;
  piCadence: PICadenceData[];
  showPICadenceHeader: boolean;
};
export const TaskGantt: React.FC<TaskGanttProps> = ({
  gridProps,
  calendarProps,
  barProps,
  ganttHeight,
  scrollY,
  milestones,
  onMilestoneClick,
  piCadence,
  piCadenceHeaderHeight,
  piCadenceHeaderBackgroundColor,
  showPICadenceHeader,
}) => {
  const ganttSVGRef = useRef<SVGSVGElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
  const newBarProps = { ...barProps, svg: ganttSVGRef };
  const milestoneProps = {
    height: calendarProps.headerHeight,
    width: gridProps.svgWidth,
    milestones,
    onMilestoneClick,
  };

  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const piCadenceHeaderProps: PICadenceHeaderProps = {
    fontFamily: calendarProps.fontFamily,
    fontSize: calendarProps.fontSize,
    width: gridProps.svgWidth,
    height: piCadenceHeaderHeight,
    backgroundColor: piCadenceHeaderBackgroundColor,
    dateSetup: calendarProps.dateSetup,
    columnWidth: calendarProps.columnWidth,
    piCadence,
    headerHeight: calendarProps.headerHeight,
    viewMode: calendarProps.viewMode
  };

  return (
    <div
      className={styles.ganttVerticalContainer}
      ref={verticalGanttContainerRef}
      dir="ltr"
    >
      {milestones.length > 0 ? <Milestones {...milestoneProps} /> : null}
      {showPICadenceHeader && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={piCadenceHeaderHeight}
          fontFamily={barProps.fontFamily}
        >
          <PICadenceHeader {...piCadenceHeaderProps} />
        </svg>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={gridProps.svgWidth}
        height={calendarProps.headerHeight}
        fontFamily={barProps.fontFamily}
      >
        <Calendar {...calendarProps} />
      </svg>
      <div
        ref={horizontalContainerRef}
        className={styles.horizontalContainer}
        style={
          ganttHeight
            ? { height: ganttHeight, width: gridProps.svgWidth }
            : { width: gridProps.svgWidth }
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={barProps.rowHeight * barProps.tasks.length}
          fontFamily={barProps.fontFamily}
          ref={ganttSVGRef}
        >
          <Grid {...gridProps} />
          <TaskGanttContent {...newBarProps} />
        </svg>
      </div>
    </div>
  );
};
