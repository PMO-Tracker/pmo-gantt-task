import React, { useEffect,useState } from "react";
import { TableHeader, TableMilestones, StatusCount } from "../../types/public-types";
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
  const milestoneStatus = ['DONE','IMPACTED','IN_PROGRESS']

  const [statusCount, setStatusCount] = useState<StatusCount>({});

  const statusColor = {
    DONE: '#CAF1CE',
    IMPACTED: '#FFD0D0',
    IN_PROGRESS: '#fefefe'
};

const statusNumberColor = {
  DONE: '#00C514',
    IMPACTED: '#FF0000',
    IN_PROGRESS: '#D9D9D9'
};


  useEffect(() => {
    const calculateStatusCount = () => {
      const count: StatusCount = {};
      milestones.forEach((item:TableMilestones) => {
        if(item.status){
          count[item.status] = (count[item.status] || 0) + 1;
        }
      });
      setStatusCount(count);
    };

    calculateStatusCount();
  }, [milestones]);


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
              height: headerHeight,
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
                borderTopLeftRadius: '6px',
                borderRight: '1px solid #D9D9D9'
              }}
            >
             <span>Milestones</span>  
             {
             milestoneStatus.map((status)=>{
              return (
                <div className={styles.milestoneStatus} style={{background: statusColor[status],marginLeft:status === 'DONE' ? '8px' : '-8px' }}>
                <span style={{color:statusNumberColor[status]}}>{statusCount[status] || 0}</span>
              </div>
              )
             })
             }
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
                    borderTopLeftRadius: !isMilestoneAvailable && headerIndex === 0 ? '6px': '0px',
                    border: '1px solid #D9D9D9',
                    borderLeftWidth: 0
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
