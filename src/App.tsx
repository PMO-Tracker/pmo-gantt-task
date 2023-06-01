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
        2,
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
      end: new Date(currentDate.getFullYear(), 1, 17, 10, 0),
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
    {
      // Task
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        20,
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
      end: new Date(currentDate.getFullYear(), 1, 20, 10, 0),
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
      start: new Date(currentDate.getFullYear(), 4, 8),
      end: new Date(currentDate.getFullYear(), 4, 9),
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
    {
      // Task
      start: new Date(currentDate.getFullYear(), 3, 2),
      end: new Date(
        currentDate.getFullYear(),
        3,
        10
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
      start: new Date(currentDate.getFullYear(), 3, 16),
      end: new Date(currentDate.getFullYear(), 3, 20),
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
    {
      start: new Date(currentDate.getFullYear(), 2, 26),
      end: new Date(currentDate.getFullYear(), 3, 1),
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


    }
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
            endDate: '02/20/2023'
          },
          "5": {
            startDate: '02/21/2023',
            endDate: '03/01/2023'
          },
          "6": {
            startDate: '03/02/2023',
            endDate: '03/10/2023'
          },
          "7": {
            startDate: '03/11/2023',
            endDate: '03/17/2023'
          },
          "8": {
            startDate: '03/18/2023',
            endDate: '03/25/2023'
          },
          "9": {
            startDate: '03/26/2023',
            endDate: '04/01/2023'
          },
          "10": {
            startDate: '04/02/2023',
            endDate: '04/10/2023'
          },
          "11": {
            startDate: '04/11/2023',
            endDate: '04/15/2023'
          },
          "12": {
            startDate: '04/16/2023',
            endDate: '04/20/2023'
          }
        }}
        barFill={16}
        // barBackgroundColor='#F04438'
        headers={[{ key: 'stageName', title: 'Project Name' }, { key: 'outlook', title: 'Outlook', bullet: true}]}
        addRecord={handleAddRecord}
      // onExpanderClick={handleExpanderClick}
      milestones={[{
        date: '04/16/2023',
        title: 'Development Start'
      },
      {
        date: '04/16/2023',
        title: 'Architecture Approved'
      },
      {
        date: '04/16/2023',
        title: 'Integration Testing'
      },
      {
        date: '04/16/2023',
        title: 'Go Live'
      }]}
      onMilestoneClick={() => alert()}
      />
    </div>
  );
}

export default App;
