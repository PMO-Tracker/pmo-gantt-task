import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project.module.css";
import { lightenHexColor } from "../../../helpers/other-helper";

export const Project: React.FC<TaskItemProps> = ({ task, isSelected }) => {
  const barColor = isSelected
    ? task.styles.backgroundSelectedColor
    : task.styles.backgroundColor;
  // const processColor = isSelected
  //   ? task.styles.progressSelectedColor
  //   : task.styles.progressColor;
  const projectWith = task.x2 - task.x1;

  // const projectLeftTriangle = [
  //   task.x1,
  //   task.y + task.height / 2 - 1,
  //   task.x1,
  //   task.y + task.height,
  //   task.x1 + 15,
  //   task.y + task.height / 2 - 1,
  // ].join(",");
  // const projectRightTriangle = [
  //   task.x2,
  //   task.y + task.height / 2 - 1,
  //   task.x2,
  //   task.y + task.height,
  //   task.x2 - 15,
  //   task.y + task.height / 2 - 1,
  // ].join(",");

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <defs>
     <linearGradient id={`gradient-${barColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="30.27%" stop-color={lightenHexColor(barColor, 60)} />
      <stop offset="104.59%" stop-color={barColor} />
    </linearGradient>
    </defs>
      <rect
     fill={`url(#gradient-${barColor})`}
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectBackground}
      />
      {/* <rect
        x={task.progressX}
        width={task.progressWidth}
        y={task.y}
        height={task.height}
        ry={task.barCornerRadius}
        rx={task.barCornerRadius}
        fill={processColor}
      /> */}
      {/* <rect
        fill={barColor}
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={task.height / 2}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectTop}
      />
      <polygon
        className={styles.projectTop}
        points={projectLeftTriangle}
        fill={barColor}
      />
      <polygon
        className={styles.projectTop}
        points={projectRightTriangle}
        fill={barColor}
      /> */}
    </g>
  );
};
