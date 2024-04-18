import React from "react";
import styles from "./task-list-table.module.css";
import { TableHeader, Task } from "../../types/public-types";
import { useDrag } from "react-dnd";

const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#667085" width="27" height="27" viewBox="0 0 512 512" id="down-arrow"><path d="M98.9 184.7l1.8 2.1 136 156.5c4.6 5.3 11.5 8.6 19.2 8.6 7.7 0 14.6-3.4 19.2-8.6L411 187.1l2.3-2.6c1.7-2.5 2.7-5.5 2.7-8.7 0-8.7-7.4-15.8-16.6-15.8H112.6c-9.2 0-16.6 7.1-16.6 15.8 0 3.3 1.1 6.4 2.9 8.9z"></path></svg>
  );
  const rightArrowIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" fill="#667085" width="27" height="27" viewBox="0 0 512 512"  id="right-arrow"><path d="m184.7 413.1 2.1-1.8 156.5-136c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2L187.1 101l-2.6-2.3C182 97 179 96 175.8 96c-8.7 0-15.8 7.4-15.8 16.6v286.8c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path></svg>
  );
  

export const TaskListTableItem: React.FC<{
    expanderSymbol:string;
    rowWidth: string;
    addRecord: (item: string) => void;
    onExpanderClick: (task: Task) => void;
    onRowClick: (task: Task) => void;
    task: Task;
    header:TableHeader

}> = ({
    expanderSymbol,
    rowWidth,
    header,
    onRowClick,
    task,
    onExpanderClick,
    addRecord


}) => {

    const [{isDragging}, drag] = useDrag({
        type: 'row',
        item:task,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      },);
  
      console.log("isDraggingssss",isDragging);

      const arrowIcons = {
        downArrow :DownArrowIcon(),
        rightArrow :rightArrowIcon(),
      }


    return (
        <div
        ref={drag}
         className={`${expanderSymbol ? styles.expanderCell : ''} ${styles.taskListCell} ${styles.taskListCursorPointer}`}
         style={{
           minWidth: rowWidth,
           maxWidth: rowWidth
         }}
         key={`${task.id}-first-row-${task[header.key]}`}
         onClick={() => onRowClick(task)}
       >
           <div
             className={
               expanderSymbol
                 ? styles.taskListExpander
                 : styles.taskListEmptyExpander
             }
             onClick={() => onExpanderClick(task)}
           >
             {expanderSymbol && arrowIcons[expanderSymbol]}
           </div>
           <div > {task[header.key] ? task[header.key] : header.showAddButton ? <a onClick={() => addRecord(header.key)}>{`Add ${header.title}`}</a> : ''}</div>
       </div>

    );
  };
