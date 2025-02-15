import React, { useEffect, useRef } from "react";
import { BarTask } from "../../types/bar-task";
import { TableHeader, TableMilestones, Task } from "../../types/public-types";
import styles from "./task-list.module.css";

export type TaskListProps = {
  headerHeight: number;
  taskListHeaderHeight: number;
  showPICadenceHeader: boolean;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  rowHeight: number;
  ganttHeight: number;
  scrollY: number;
  locale: string;
  tasks: Task[];
  headers: TableHeader[];
  taskListRef: React.RefObject<HTMLDivElement>;
  horizontalContainerClass?: string;
  selectedTask: BarTask | undefined;
  milestones: TableMilestones[];
  setSelectedTask: (task: string) => void;
  onExpanderClick: (task: Task) => void;
  onRowClick: (task: Task) => void;
  addRecord: (item: string) => void;
  TaskListHeader: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    headers: TableHeader[];
    milestones: TableMilestones[];
    taskListHeaderHeight: number;
    showPICadenceHeader: boolean;
  }>;
  TaskListTable: React.FC<{
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: Task[];
    headers: TableHeader[];
    selectedTaskId: string;
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
    onRowClick: (task: Task) => void;
    addRecord: (item: string) => void;
  }>;
};

export const TaskList: React.FC<TaskListProps> = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  rowHeight,
  scrollY,
  tasks,
  selectedTask,
  setSelectedTask,
  onExpanderClick,
  onRowClick,
  addRecord,
  locale,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
  headers,
  milestones,
  taskListHeaderHeight,
  showPICadenceHeader,
}) => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const headerProps = {
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
    headers,
    milestones,
    taskListHeaderHeight,
    showPICadenceHeader,
  };
  const selectedTaskId = selectedTask ? selectedTask.id : "";
  const tableProps = {
    rowHeight,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    headers,
    locale,
    selectedTaskId: selectedTaskId,
    setSelectedTask,
    onExpanderClick,
    onRowClick,
    addRecord,
  };

  return (
    <div ref={taskListRef} className={styles.taskListHeader}>
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      >
        <TaskListTable {...tableProps} />
      </div>
    </div>
  );
};
