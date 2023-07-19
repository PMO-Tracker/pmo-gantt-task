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
        15,
      ),
      id: "Task 0wiepoqwei",
      // progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 1,
      team: "asdasdas",
      styles: {
        backgroundColor: '#12B76A'
      },
      stageName: "Discussion with teamoooo",
      outlook: 'gray',
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 30),
      id: "Task 1xmznbcnmzxn",
      // dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      styles: {
        backgroundColor: '#12B76A'
      },
      stageName: "Discussion with teamllllll",
      outlook: 'green'


    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25, 0, 0),
      stageName: "Discussion with teamzzz",
      id: "Task 2=======>>>",
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
      id: "Task 0asdas",
      // progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      team: "asdasdas--->>>",
      styles: {
        backgroundColor: '#667085'
      },
      stageName: "asdasdas--->>>",
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
      stageName: "Discussion with teamwwww",
      outlook: 'green'


    },
    {
      start: new Date(currentDate.getFullYear(), 3, 8),
      end: new Date(currentDate.getFullYear(), 3, 9),
      stageName: "Discussion with teampppp",
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
      id: "Task 0qweqweqweqw",
      // progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      team: "asdasdas",
      styles: {
        backgroundColor: '#667085'
      },
      stageName: "Discussion with team??",
      outlook: 'gray'

    },
    {
      start: new Date(currentDate.getFullYear(), 0, 10),
      end: new Date(currentDate.getFullYear(), 0, 1),
      stageName: "---",
      id: "Task 2qwpoeipoqwie",
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
    <div style={{ margin: '20px', textAlign: 'center', border: '1px solid #F2F4F7', borderRadius: '8px' }}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Range}
        fontFamily="Consolas, Monaco, 'Andale Mono', monospace"
        columnWidth={20}
        headerHeight={64}
        listCellWidth='200px'
        onRowClick={handlRowClick}
        ranges={{
          "1": {
            startDate: '01/01/2023',
            endDate: '01/15/2023'
          },
          "2": {
            startDate: '01/16/2023',
            endDate: '01/30/2023'
          },
          "3": {
            startDate: '01/31/2023',
            endDate: '02/15/2023'
          },
          "4": {
            startDate: '02/16/2023',
            endDate: '02/28/2023'
          },
          "5": {
            startDate: '03/01/2023',
            endDate: '03/15/2023'
          },
        }}
        barFill={46}
        // barBackgroundColor='#F04438'
        headers={[{ key: 'stageName', title: 'Project Name' }, { key: 'outlook', title: 'Outlook', bullet: true }]}
        addRecord={handleAddRecord}
        // onExpanderClick={handleExpanderClick}
        milestones={[{
          endDate: '04/16/2023',
          title: 'Development Start'
        },
        {
          endDate: '04/16/2023',
          title: 'Architecture Approved'
        },
        {
          endDate: '04/16/2023',
          title: 'Integration Testing'
        },
        {
          endDate: '04/16/2023',
          title: 'Go Live'
        }]}
        onMilestoneClick={() => alert()}
        onStageRowClick={(tasl) => alert(tasl)}
        onDateChange={(task) =>{console.log(task,'datechangedatechange')}}
      />
    </div>
  );
}

export default App;
