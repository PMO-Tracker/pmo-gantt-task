import { CalendarRanges } from "./date-setup";

export interface TableHeader {
  key: string;
  title: string;
  showAddButton?: boolean;
  bullet?: boolean;
  render?: (task: Task) => any;
}

export interface TableMilestones {
  title: string;
  endDate?: string;
  startDate?: string;
  status?: string;
}

export interface StatusCount {
  [status: string]: number;
}

export enum ViewMode {
  Hour = "Hour",
  QuarterDay = "Quarter Day",
  HalfDay = "Half Day",
  Day = "Day",
  /** ISO-8601 week */
  Week = "Week",
  Month = "Month",
  Year = "Year",
  Range = "Range",
}
export type TaskType = "task" | "milestone" | "project";
export interface Task {
  id: string;
  type: TaskType;
  stageName: string;
  subStageName?: string;
  team?: string;
  jiraEpics?: string;
  start: Date;
  end: Date;
  /**
   * From 0 to 100
   */
  progress: number;
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  dependencies?: string[];
  hideChildren?: boolean;
  displayOrder?: number;
  hide?: boolean;
  barText?: string;
}

export interface EventOption {
  /**
   * Time step value for date changes.
   */
  timeStep?: number;
  /**
   * Invokes on bar select on unselect.
   */
  onSelect?: (task: Task, isSelected: boolean) => void;
  /**
   * Invokes on bar double click.
   */
  onDoubleClick?: (task: Task) => void;
  /**
   * Invokes on bar click.
   */
  onClick?: (task: Task) => void;
  /**
   * Invokes on end and start time change. Chart undoes operation if method return false or error.
   */
  onDateChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on progress change. Chart undoes operation if method return false or error.
   */
  onProgressChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on delete selected task. Chart undoes operation if method return false or error.
   */
  onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on expander on task list
   */
  onExpanderClick?: (task: Task) => void;
  onRowClick?: (task: Task) => void;
  addRecord?: (item: string) => void;
  onMilestoneClick?: (item: TableMilestones) => void;
  onStageRowClick?: (item: Task) => void;
  onArrowDoubleClick: (taskFrom: Task, taskTo: Task) => void;
}

export interface DisplayOption {
  viewMode?: ViewMode;
  viewDate?: Date;
  preStepsCount?: number;
  /**
   * Specifies the month name language. Able formats: ISO 639-2, Java Locale
   */
  locale?: string;
  rtl?: boolean;
}

export interface StylingOption {
  headerHeight?: number;
  columnWidth?: number;
  listCellWidth?: string;
  rowHeight?: number;
  ganttHeight?: number;
  barCornerRadius?: number;
  handleWidth?: number;
  fontFamily?: string;
  fontSize?: string;
  /**
   * How many of row width can be taken by task.
   * From 0 to 100
   */
  barFill?: number;
  barProgressColor?: string;
  barProgressSelectedColor?: string;
  barBackgroundColor?: string;
  barBackgroundSelectedColor?: string;
  projectProgressColor?: string;
  projectProgressSelectedColor?: string;
  projectBackgroundColor?: string;
  projectBackgroundSelectedColor?: string;
  milestoneBackgroundColor?: string;
  milestoneBackgroundSelectedColor?: string;
  arrowColor?: string;
  arrowIndent?: number;
  todayColor?: string;
  alternateShadeColor?: string;
  currentShadeColor?: string;
  TooltipContent?: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
  TaskListHeader?: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    taskListHeaderHeight: number;
  }>;
  TaskListTable?: React.FC<{
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: Task[];
    selectedTaskId: string;
    /**
     * Sets selected task by id
     */
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
  }>;
}

export type PICadenceData = {
  id?: string;
  programIncrementName: string;
  piStartDate: string;
  piEndDate: string;
  numberOfSprints: number;
  firstSprintOfProgramIncrement: string;
  sprintNames: string[];
};
export interface GanttProps
  extends CalendarRanges,
    EventOption,
    DisplayOption,
    StylingOption {
  tasks: Task[];
  headers?: TableHeader[];
  milestones?: TableMilestones[];
  cadenceStartDate?: string;
  taskListHeaderHeight?: number;
  piCadenceHeaderHeight?: number;
  piCadenceHeaderBackgroundColor?: string;
  piCadence?: PICadenceData[];
}

export type ProgramIncrementData = {
  programIncrementName: string;
  tickx: number[];
  firstTick: number;
  lastTick: number;
  avgTick: number;
};

export type MidRangeData = {
  date: Date;
  sprint: string;
};
