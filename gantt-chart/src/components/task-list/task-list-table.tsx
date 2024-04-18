import React from "react";
import styles from "./task-list-table.module.css";
import { TableHeader, Task } from "../../types/public-types";
import { TaskListTableRow } from "./task-list-table-row";


// const localeDateStringCache = {};
// const toLocaleDateStringFactory =
//   (locale: string) =>
//   (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
//     const key = date.toString();
//     let lds = localeDateStringCache[key];
//     if (!lds) {
//       lds = date.toLocaleDateString(locale, dateTimeOptions);
//       localeDateStringCache[key] = lds;
//     }
//     return lds;
// };
// const dateTimeOptions: Intl.DateTimeFormatOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  headers: TableHeader[],
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  onRowClick: (task: Task) => void,
  addRecord: (item: string) => void
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  headers,
  // locale, 
  onExpanderClick,
  onRowClick,
  addRecord
}) => {
    // const toLocaleDateString = useMemo(
    //   () => toLocaleDateStringFactory(locale),
    //   [locale]
    // );



    return (
      <div
         className={styles.taskListWrapper}
         style={{
          fontFamily: fontFamily,
          fontSize: fontSize
        }}
      >
        {tasks.map(t => {
          let expanderSymbol = "";
          if (t.hideChildren === false) {
            expanderSymbol = 'downArrow';
          } else if (t.hideChildren === true) {
            expanderSymbol = "rightArrow";
          }

          return (
            <TaskListTableRow
            expanderSymbol={expanderSymbol}
            rowWidth={rowWidth}
            addRecord={addRecord}
            onExpanderClick={onExpanderClick}
            task={t}
            headers={headers}
            rowHeight={rowHeight}
            onRowClick={onRowClick}
            />
            // <div
            //   className={styles.taskListTableRow}
            //   style={{ height: rowHeight }}
            //   key={`${t.id}row`}
            // >
            //   {
            //     headers.map((rowItem, rowItemIndex) => {
            //       if (rowItemIndex === 0 && onExpanderClick) {
            //         return (
            //           <TaskListTableItem
            //             expanderSymbol={expanderSymbol}
            //             rowWidth={rowWidth}
            //             addRecord={addRecord}
            //             onExpanderClick={onExpanderClick}
            //             onRowClick={onRowClick}
            //             task={t}
            //             header={rowItem}
            //           />
            //         )
            //       } else {
            //         if(rowItem.render){
            //           return rowItem.render(t)
            //         }
            //         return (
            //           <TaskListTableSubItem
            //           rowWidth={rowWidth}
            //           addRecord={addRecord}
            //           task={t}
            //           header={rowItem}
            //           />
            //           // <div
            //           //   className={styles.taskListCell}
            //           //   style={{
            //           //     minWidth: rowWidth,
            //           //     maxWidth: rowWidth
            //           //   }}
            //           //   key={`${t.id}-${t[rowItem.key] ? t[rowItem.key] : rowItem.key}`}
            //           // >
            //           //   {t[rowItem.key] ? <span style={{ ...textStyle }}>{t[rowItem.key]}</span> : rowItem.showAddButton ? <a onClick={() => addRecord(rowItem.key)}>{`Add ${rowItem.title}`}</a> : ''}
            //           // </div>
            //         )
            //       }
            //     })
            //   }
            // </div>
          );
        })}
      </div>
    );
  };
