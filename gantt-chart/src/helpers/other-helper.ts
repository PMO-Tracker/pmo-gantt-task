import { BarTask } from "../types/bar-task";
import { Task } from "../types/public-types";

export function isKeyboardEvent(
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent
): event is React.KeyboardEvent {
  return (event as React.KeyboardEvent).key !== undefined;
}

export function isMouseEvent(
  event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent
): event is React.MouseEvent {
  return (event as React.MouseEvent).clientX !== undefined;
}

export function isBarTask(task: Task | BarTask): task is BarTask {
  return (task as BarTask).x1 !== undefined;
}

export function removeHiddenTasks(tasks: Task[]) {
  const groupedTasks = tasks.filter(
    t => t.hideChildren && t.type === "project"
  );
  if (groupedTasks.length > 0) {
    for (let i = 0; groupedTasks.length > i; i++) {
      const groupedTask = groupedTasks[i];
      const children = getChildren(tasks, groupedTask);
      tasks = tasks.filter(t => children.indexOf(t) === -1);
    }
  }
  return tasks;
}

function getChildren(taskList: Task[], task: Task) {
  let tasks: Task[] = [];
  if (task.type !== "project") {
    tasks = taskList.filter(
      t => t.dependencies && t.dependencies.indexOf(task.id) !== -1
    );
  } else {
    tasks = taskList.filter(t => t.project && t.project === task.id);
  }
  var taskChildren: Task[] = [];
  tasks.forEach(t => {
    taskChildren.push(...getChildren(taskList, t));
  })
  tasks = tasks.concat(tasks, taskChildren);
  return tasks;
}

export const sortTasks = (taskA: Task, taskB: Task) => {
  const orderA = taskA.displayOrder || Number.MAX_VALUE;
  const orderB = taskB.displayOrder || Number.MAX_VALUE;
  if (orderA > orderB) {
    return 1;
  } else if (orderA < orderB) {
    return -1;
  } else {
    return 0;
  }
};



export const lightenHexColor = (hex:string, percent:number) => {
  // Parse the hex color to RGB
  const bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Calculate lighter shade
  r = Math.min(255, Math.round(r * (1 + percent / 100)));
  g = Math.min(255, Math.round(g * (1 + percent / 100)));
  b = Math.min(255, Math.round(b * (1 + percent / 100)));

  // Convert RGB back to hex
  const newHex = '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  return newHex;
};

export const getRangesForDate = (
  ranges: Record<string, { startDate: string; endDate: string }>,
  date: Date,
  shortenName: boolean = false
): string => {
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  const formatName = (name: string): string => {
    if (name.includes('Sprint')) return shortenName ? `SP ${name.replace('Sprint ', '')}` : name;
    if (name.includes('Quarter')) {
      const match = name.match(/Quarter (\d+)/);
      return shortenName ? `Q ${match?.[1]}` : `Quarter ${match?.[1]}`;
    }
    return name;
  };

  const result = Object.keys(ranges).reduce((acc, name) => {
    const { startDate, endDate } = ranges[name];
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
      (start.getMonth() === dateMonth && start.getFullYear() === dateYear) ||
      (end.getMonth() === dateMonth && end.getFullYear() === dateYear)
    ) {
      acc.push(formatName(name));
    }

    return acc;
  }, [] as string[]);

  return result.length ? ` (${result.join(', ')})` : '';
};

export const addDatesToSet = (start: Date, end: Date, dateSet: any) => {
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dateSet.add(d.getTime());
  }
};