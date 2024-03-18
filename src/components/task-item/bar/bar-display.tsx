import React from "react";
import style from "./bar.module.css";
import { lightenHexColor } from "../../../helpers/other-helper";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  // isSelected,
  // progressX,
  // progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
}) => {
  // const getProcessColor = () => {
  //   return isSelected ? styles.progressSelectedColor : styles.progressColor;
  // };

  // const getBarColor = () => {
  //   return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  // };

  return (
    <g onMouseDown={onMouseDown}>
      <defs>
     <linearGradient id={`gradient-${styles.backgroundColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="30.27%" stopColor={lightenHexColor(styles.backgroundColor, 60)} />
      <stop offset="104.59%" stopColor={styles.backgroundColor} />
    </linearGradient>
    </defs>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={`url(#gradient-${styles.backgroundColor})`}
        className={style.barBackground}
      />
      {/* <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      /> */}
    </g>
  );
};
