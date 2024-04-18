import React from "react";
import styles from "./task-list-table.module.css";
import { TableHeader, Task } from "../../types/public-types";
import { useDrop } from "react-dnd";
import { TaskListTableItem } from "./task-list-table-item";
import { TaskListTableSubItem } from "./task-list-table-subitem";

export const TaskListTableRow: React.FC<{
  rowHeight: number;
  rowWidth: string;
  headers: TableHeader[];
  onExpanderClick: (task: Task) => void;
  onRowClick: (task: Task) => void;
  addRecord: (item: string) => void;
  expanderSymbol:string;
  task: Task;

}> = ({
    rowHeight,
    rowWidth,
    headers,
    onExpanderClick,
    onRowClick,
    addRecord,
    expanderSymbol,
    task,
}) => {


  const [{isLighten}, drop] = useDrop({
    accept: 'row',
    
    drop: (item: any) => {
      handleMoveTaskAfter(item,task);
    },

    collect: (monitor) => ({
      isLighten: monitor.isOver(),
    }),
  });
const handleMoveTaskAfter = (item : any,task:any)=>{
console.log("handleMoveTaskAfter",item,task,isLighten)
}


    return (
        <div
        ref={drop}
        className={styles.taskListTableRow}
        style={{ height: rowHeight }}
        key={`${task.id}row`}
      >
        {
          headers.map((rowItem, rowItemIndex) => {
            if (rowItemIndex === 0 && onExpanderClick) {
              return (
                <TaskListTableItem
                  expanderSymbol={expanderSymbol}
                  rowWidth={rowWidth}
                  addRecord={addRecord}
                  onExpanderClick={onExpanderClick}
                  onRowClick={onRowClick}
                  task={task}
                  header={rowItem}
                />
              )
            } else {
              if(rowItem.render){
                return rowItem.render(task)
              }
              return (
                <TaskListTableSubItem
                rowWidth={rowWidth}
                addRecord={addRecord}
                task={task}
                header={rowItem}
                />
              )
            }
          })
        }
      </div>

    );
  };
