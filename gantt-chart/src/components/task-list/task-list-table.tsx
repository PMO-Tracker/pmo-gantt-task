import React from "react";
import styles from "./task-list-table.module.css";
import { TableHeader, Task } from "../../types/public-types";

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
const DownArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#667085" width="27" height="27" viewBox="0 0 512 512" id="down-arrow"><path d="M98.9 184.7l1.8 2.1 136 156.5c4.6 5.3 11.5 8.6 19.2 8.6 7.7 0 14.6-3.4 19.2-8.6L411 187.1l2.3-2.6c1.7-2.5 2.7-5.5 2.7-8.7 0-8.7-7.4-15.8-16.6-15.8H112.6c-9.2 0-16.6 7.1-16.6 15.8 0 3.3 1.1 6.4 2.9 8.9z"></path></svg>
);
const rightArrowIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="#667085" width="27" height="27" viewBox="0 0 512 512"  id="right-arrow"><path d="m184.7 413.1 2.1-1.8 156.5-136c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2L187.1 101l-2.6-2.3C182 97 179 96 175.8 96c-8.7 0-15.8 7.4-15.8 16.6v286.8c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path></svg>
);

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

    const arrowIcons = {
      downArrow :DownArrowIcon(),
      rightArrow :rightArrowIcon(),
    }

    return (
      <div
        className={styles.taskListWrapper}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
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
            <div
              className={styles.taskListTableRow}
              style={{ height: rowHeight }}
              key={`${t.id}row`}
            >
              {
                headers.map((rowItem, rowItemIndex) => {
                  if (rowItemIndex === 0 && onExpanderClick) {
                    return (
                      <div
                        className={`${expanderSymbol ? styles.expanderCell : ''} ${styles.taskListCell} ${styles.taskListCursorPointer}`}
                        style={{
                          minWidth: rowWidth,
                          maxWidth: rowWidth,
                        }}
                        key={`${t.id}-first-row-${t[rowItem.key]}`}
                        onClick={() => onRowClick(t)}
                      >
                          <div
                            className={
                              expanderSymbol
                                ? styles.taskListExpander
                                : styles.taskListEmptyExpander
                            }
                            onClick={() => onExpanderClick(t)}
                          >
                            {expanderSymbol && arrowIcons[expanderSymbol]}
                          </div>
                          <div>{t[rowItem.key] ? t[rowItem.key] : rowItem.showAddButton ? <a onClick={() => addRecord(rowItem.key)}>{`Add ${rowItem.title}`}</a> : ''}</div>
                      </div>
                    )
                  } else {
                    const textStyle = rowItem.bullet ? {
                      backgroundColor: t[rowItem.key],
                      color: '#fefefe',
                      borderRadius: '15px',
                      padding: '6px 16px'
                    } : {};
                    if(rowItem.render){
                      return rowItem.render(t)
                    }
                    return (
                      <div
                        className={styles.taskListCell}
                        style={{
                          minWidth: rowWidth,
                          maxWidth: rowWidth
                        }}
                        key={`${t.id}-${t[rowItem.key] ? t[rowItem.key] : rowItem.key}`}
                      >
                        {t[rowItem.key] ? <span style={{ ...textStyle }}>{t[rowItem.key]}</span> : rowItem.showAddButton ? <a onClick={() => addRecord(rowItem.key)}>{`Add ${rowItem.title}`}</a> : ''}
                      </div>
                    )
                  }
                })
              }
            </div>
          );
        })}
      </div>
    );
  };
