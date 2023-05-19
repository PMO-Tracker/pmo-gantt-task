import React from "react";
import { TableHeader } from "../../types/public-types";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  headers: TableHeader[],
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, headers }) => {

  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight
        }}
      >
        {
          headers.map((headerItem) => {
            return (
              <React.Fragment key={headerItem.title}>
                <div
                  className={styles.ganttTable_HeaderItem}
                  style={{
                    minWidth: rowWidth,
                    background: '#F2F4F7',
                    color: '#101828'
                  }}
                >
                  &nbsp;{headerItem.title}
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  );
};
