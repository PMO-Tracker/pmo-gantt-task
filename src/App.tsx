import { Gantt, Task, ViewMode } from "gantt-task-react/dist/index";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import "./App.css";

function initTasks() {
  const currentDate = new Date('01/01/2023');
  const tasks: any[] = [
    // {
    //   // Project
    //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    //   id: "ProjectSample",
    //   type: "project",
    //   hideChildren: false,
    //   displayOrder: 1,
    //   team: 'sadasds',
    //   styles: {
    //     backgroundColor: '#F04438'
    //   }
    // },
    {
      // Task
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        6,
        12,
        28
      ),
      id: "Task 0",
      // progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      team: "asdasdas",
      styles: {
        backgroundColor: '#667085'
      },
      stageName: "Discussion with team",
      outlook: 'gray'

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 10, 0),
      id: "Task 1",
      // dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
      styles: {
        backgroundColor: '#12B76A'
      },
      stageName: "Discussion with team",
      outlook: 'green'


    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25, 0, 0),
      stageName: "Discussion with team",
      id: "Task 2",
      // dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
      styles: {
        backgroundColor: '#F04438'
      },
      outlook: 'red'

    },
  ];
  return tasks;
}
function App() {
  const [tasks, setTasks] = useState(initTasks());

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  };

  const handlRowClick = (task: Task) => {
    console.log(task);
  };

  const handleAddRecord = (itemToAdd: string) => {
    console.log(itemToAdd, '=====>>>')
  };

  return (
    <div style={{margin: '20px', textAlign: 'center', border: '1px solid #F2F4F7', borderRadius: '8px'}}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Range}
        fontFamily="Consolas, Monaco, 'Andale Mono', monospace"
        columnWidth={240}
        headerHeight={64}
        listCellWidth='200px'
        onRowClick={handlRowClick}
        ranges={{
          "1": {
            startDate: '1/1/2023',
            endDate: '1/15/2023'
          },
          "2": {
            startDate: '01/16/2023',
            endDate: '01/30/2023'
          },
          "3": {
            startDate: '01/31/2023',
            endDate: '02/10/2023'
          },
          "4": {
            startDate: '02/11/2023',
            endDate: '02/20 /2023'
          },
        }}
        barFill={16}
        // barBackgroundColor='#F04438'
        headers={[{ key: 'stageName', title: 'Project Name' }, { key: 'outlook', title: 'Outlook', bullet: true}]}
        addRecord={handleAddRecord}
      // onExpanderClick={handleExpanderClick}
      />
    </div>
  );
}

export default App;
