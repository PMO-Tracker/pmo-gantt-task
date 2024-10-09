import React from "react";
import { GridBody, GridBodyProps } from "./grid-body";
import { CalendarRanges } from "../../types/date-setup";

export type GridProps = GridBodyProps
export const Grid: React.FC<GridProps & { calendarRanges?: CalendarRanges }> = props => {
  return (
    <g className="grid">
      <GridBody {...props} />
    </g>
  );
};
