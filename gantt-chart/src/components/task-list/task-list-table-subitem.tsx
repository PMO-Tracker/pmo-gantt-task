import React from "react";
import styles from "./task-list-table.module.css";
import { TableHeader, Task } from "../../types/public-types";
import { useDrag } from "react-dnd";

export const TaskListTableSubItem: React.FC<{
    rowWidth: string;
    addRecord: (item: string) => void;
    task: Task;
    header:TableHeader

}> = ({
    rowWidth,
    header,
    task,
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

      const textStyle = header.bullet ? {
        backgroundColor: task[header.key],
        color: '#fefefe',
        borderRadius: '15px',
        padding: '6px 16px'
      } : {};

    return (
        <div
        ref={drag}
        className={styles.taskListCell}
        style={{
          minWidth: rowWidth,
          maxWidth: rowWidth
        }}
        key={`${task.id}-${task[header.key] ? task[header.key] : header.key}`}
      >
        {task[header.key] ? <span style={{ ...textStyle }}>{task[header.key]}</span> : header.showAddButton ? <a onClick={() => addRecord(header.key)}>{`Add ${header.title}`}</a> : ''}
      </div>

    );
  };
