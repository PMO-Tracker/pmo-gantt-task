import React from "react";
import { TableHeader, TableMilestones } from "../../types/public-types";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  headers: TableHeader[],
  milestones: TableMilestones[]
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, headers, milestones }) => {
  const isMilestoneAvailable = milestones?.length > 0;

  return (
    <div
      // className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {
        isMilestoneAvailable && (
          <div
            className={`${styles.ganttTable_Header} ${styles.milestoneHeader}`}
            style={{
              height: headerHeight
            }}
          >
            <div
              className={styles.ganttTable_HeaderItem}
              style={{
                background: '#F2F4F7',
                color: '#101828',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                borderTopLeftRadius: '6px'
              }}
            >
              Milestones
            </div>
          </div>
        )
      }
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight
        }}
      >
        {
          headers.map((headerItem, headerIndex) => {
            return (
              <React.Fragment key={headerItem.title}>
                <div
                  className={styles.ganttTable_HeaderItem}
                  style={{
                    minWidth: rowWidth,
                    background: '#F2F4F7',
                    color: '#101828',
                    borderTopLeftRadius: !isMilestoneAvailable && headerIndex === 0 ? '6px': '0px'
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
