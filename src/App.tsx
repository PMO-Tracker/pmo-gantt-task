import { Gantt, Task, ViewMode } from "gantt-task-react/dist/index";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import "./App.css";

function initTasks() {
  const tasks : any [] = [
    {
      start:  new Date('2024-02-14'),
      end: new Date('2024-04-23'),
      id: 'Development',
      theme: '',
      stageName: 'Development',
      hideChildren: true,
      team: '',
      type: 'project',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: null,
      styles: {
        backgroundColor: '#673ab7'
      },
      barText: '6 Sub Stage'
    },
    {
      start:  new Date('2024-02-29'),
      end:  new Date('2024-03-25'),
      id: 'Development-Back-end development',
      theme: '',
      subStageName: 'Back-end development',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Development',
      styles: {
        backgroundColor: '#8bc34a'
      },
      barText: null
    },
    {
      start:  new Date('2024-03-02'),
      end:  new Date('2024-03-17'),
      id: 'Development-Designing the solution architecture',
      theme: '',
      subStageName: 'Designing the solution architecture',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Development',
      styles: {
        backgroundColor: '#795548'
      },
      barText: null
    },
    {
      start:  new Date('2024-02-14'),
      end:  new Date('2024-02-29'),
      id: 'Development-Front-end development',
      theme: '',
      subStageName: 'Front-end development',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Development',
      styles: {
        backgroundColor: '#673ab7'
      },
      barText: null
    },
    {
      start:  new Date('2024-03-07'),
      end: new Date('2024-03-20'),
      id: 'Development-Database design and implementation',
      theme: '',
      subStageName: 'Database design and implementation',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Development',
      styles: {
        backgroundColor: '#8bc34a'
      },
      barText: null
    },
    {
      start:  new Date('2024-03-19') ,
      end:  new Date('2024-03-26') ,
      id: 'Development-Infrastructure Setup',
      theme: '',
      subStageName: 'Infrastructure Setup',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [
        'Development-Back-end development'
      ],
      originalDependencies: [
        {
          stageName: 'Back-end development',
          percentage: 100,
          startDate: '13-03-2024',
          endDate: '27-03-2024'
        }
      ],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Development',
      styles: {
        backgroundColor: '#00bcd4'
      },
      barText: null
    },
    {
      start:   new Date('2024-04-15'),
      end:   new Date('2024-04-23'),
      id: 'Development-Integration of external systems',
      theme: '',
      subStageName: 'Integration of external systems',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Development',
      styles: {
        backgroundColor: '#00bcd4'
      },
      barText: null
    },
    {
      start:  new Date('2024-02-29'),
      end:   new Date('2024-03-31'),
      id: 'Go Live',
      theme: '',
      stageName: 'Go Live',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: null,
      styles: {
        backgroundColor: '#e91e63'
      },
      barText: null
    },
    {
      start:   new Date('2024-02-07'),
      end:  new Date('2024-02-23'),
      id: 'new onee',
      theme: '',
      stageName: 'new onee',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: null,
      styles: {
        backgroundColor: '#03a9f4'
      },
      barText: null
    },
    {
      start:  new Date('2024-03-11'),
      end:  new Date('2024-04-22'),
      id: 'Test 1044',
      theme: '',
      stageName: 'Test 1044',
      hideChildren: true,
      team: '',
      type: 'project',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: null,
      styles: {
        backgroundColor: '#03a9f4'
      },
      barText: '4 Sub Stage'
    },
    {
      start:  new Date('2024-03-12'),
      end:  new Date('2024-03-20'),
      id: 'Test 1044-test 1',
      theme: '',
      subStageName: 'test 1',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Test 1044',
      styles: {
        backgroundColor: '#3f51b5'
      },
      barText: null
    },
    {
      start:  new Date('2024-03-11'),
      end:   new Date('2024-03-20'),
      id: 'Test 1044-test 5',
      theme: '',
      subStageName: 'test 5',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Test 1044',
      styles: {
        backgroundColor: '#e91e63'
      },
      barText: null
    },
    {
      start:  new Date('2024-03-12'),
      end:  new Date('2024-03-21'),
      id: 'Test 1044-test 2',
      theme: '',
      subStageName: 'test 2',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Test 1044',
      styles: {
        backgroundColor: '#9c27b0'
      },
      barText: null
    },
    {
      start: new Date('2024-03-31'),
      end: new Date('2024-04-22'),
      id: 'Test 1044-test 3',
      theme: '',
      subStageName: 'test 3',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [],
      originalDependencies: [],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: 'Test 1044',
      styles: {
        backgroundColor: '#673ab7'
      },
      barText: null
    },
    {
      start: new Date('2024-04-14'),
      end: new Date('2024-04-22'),
      id: 'Discovery',
      theme: '',
      stageName: 'Discovery',
      hideChildren: true,
      team: '',
      type: 'task',
      dependencies: [
        'Development'
      ],
      originalDependencies: [
        {
          stageName: 'Development',
          percentage: 100,
          startDate: '13-03-2024',
          endDate: '27-03-2024'
        }
      ],
      jiraEpic: '',
      barBackgroundColor: '#ffbb54',
      project: null,
      styles: {
        backgroundColor: '#00bcd4'
      },
      barText: null
    }
  ];;

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

   const getStartEndDateForProject = (tasks: Task[], projectId: string) => {
    const projectTasks = tasks.filter(t => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;
  
    for (let i = 0; i < projectTasks.length; i++) {
      const task = projectTasks[i];
      if (start.getTime() > task.start.getTime()) {
        start = task.start;
      }
      if (end.getTime() < task.end.getTime()) {
        end = task.end;
      }
    }
    return [start, end];
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" , task);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };


  return (
    <div style={{ margin: '20px', textAlign: 'center'}}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Range}
        fontFamily="Consolas, Monaco, 'Andale Mono', monospace"
        columnWidth={80}
        headerHeight={64}
        listCellWidth='200px'
        onRowClick={handlRowClick}
        ranges={{
          'Sprint 13': {
            startDate: '02/06/2024',
            endDate: '02/15/2024'
          },
          'Sprint 14': {
            startDate: '02/16/2024',
            endDate: '02/25/2024'
          },
          'Sprint 15': {
            startDate: '02/26/2024',
            endDate: '03/06/2024'
          },
          'Sprint 16': {
            startDate: '03/07/2024',
            endDate: '03/16/2024'
          },
          'Sprint 17': {
            startDate: '03/17/2024',
            endDate: '03/26/2024'
          },
          'Sprint 18': {
            startDate: '03/27/2024',
            endDate: '04/05/2024'
          },
          'Sprint 19': {
            startDate: '04/06/2024',
            endDate: '04/15/2024'
          },
          'Sprint 20': {
            startDate: '04/16/2024',
            endDate: '04/25/2024'
          },
          'Sprint 21': {
            startDate: '04/26/2024',
            endDate: '05/05/2024'
          },
          'Sprint 22': {
            startDate: '05/06/2024',
            endDate: '05/15/2024'
          },
          'Sprint 23': {
            startDate: '05/16/2024',
            endDate: '05/25/2024'
          },
          'Sprint 24': {
            startDate: '05/26/2024',
            endDate: '06/04/2024'
          },
          'Sprint 25': {
            startDate: '06/05/2024',
            endDate: '06/14/2024'
          },
          'Sprint 26': {
            startDate: '06/15/2024',
            endDate: '06/24/2024'
          },
          'Sprint 27': {
            startDate: '06/25/2024',
            endDate: '07/04/2024'
          },
          'Sprint 28': {
            startDate: '07/05/2024',
            endDate: '07/14/2024'
          },
          'Sprint 29': {
            startDate: '07/15/2024',
            endDate: '07/24/2024'
          },
          'Sprint 30': {
            startDate: '07/25/2024',
            endDate: '08/03/2024'
          },
          'Sprint 31': {
            startDate: '08/04/2024',
            endDate: '08/13/2024'
          },
          'Sprint 32': {
            startDate: '08/14/2024',
            endDate: '08/23/2024'
          },
          'Sprint 33': {
            startDate: '08/24/2024',
            endDate: '09/02/2024'
          },
          'Sprint 34': {
            startDate: '09/03/2024',
            endDate: '09/12/2024'
          },
          'Sprint 35': {
            startDate: '09/13/2024',
            endDate: '09/22/2024'
          },
          'Sprint 36': {
            startDate: '09/23/2024',
            endDate: '10/02/2024'
          },
          'Sprint 37': {
            startDate: '10/03/2024',
            endDate: '10/12/2024'
          },
          'Sprint 38': {
            startDate: '10/13/2024',
            endDate: '10/22/2024'
          },
          'Sprint 39': {
            startDate: '10/23/2024',
            endDate: '11/01/2024'
          },
          'Sprint 40': {
            startDate: '11/02/2024',
            endDate: '11/11/2024'
          },
          'Sprint 41': {
            startDate: '11/12/2024',
            endDate: '11/21/2024'
          },
          'Sprint 42': {
            startDate: '11/22/2024',
            endDate: '12/01/2024'
          },
          'Sprint 43': {
            startDate: '12/02/2024',
            endDate: '12/11/2024'
          },
          'Sprint 44': {
            startDate: '12/12/2024',
            endDate: '12/21/2024'
          },
          'Sprint 45': {
            startDate: '12/22/2024',
            endDate: '12/31/2024'
          }
        }}
        barFill={46}
        // barBackgroundColor='#F04438'
        headers={[  { key: 'stageName', title: 'Stage Name' },
        { key: 'subStageName', title: 'Substage' },
        { key: 'team', title: 'Team' }]}
        piCadence={[
          {
            programIncrementName: 'PI-3',
            numberOfSprints: 3,
            firstSprintOfProgramIncrement: 'Sprint 2',
            sprintNames: [
              'Sprint 2',
              'Sprint 3',
              'Sprint 4'
            ],
            piStartDate: '2024-02-06T00:00:00.000+00:00',
            piEndDate: '2024-03-16T00:00:00.000+00:00'
          },
          {
            programIncrementName: 'PI-4',
            numberOfSprints: 3,
            firstSprintOfProgramIncrement: 'Sprint 5',
            sprintNames: [
              'Sprint 5',
              'Sprint 6',
              'Sprint 7'
            ],
            piStartDate: '2024-03-17T00:00:00.000+00:00',
            piEndDate: '2024-04-25T00:00:00.000+00:00'
          },
          {
            programIncrementName: 'PI-5',
            numberOfSprints: 3,
            firstSprintOfProgramIncrement: 'Sprint 8',
            sprintNames: [
              'Sprint 8',
              'Sprint 9',
              'Sprint 10'
            ],
            piStartDate: '2024-04-26T00:00:00.000+00:00',
            piEndDate: '2024-07-24T00:00:00.000+00:00'
          },
          {
            programIncrementName: 'PI-6',
            numberOfSprints: 3,
            firstSprintOfProgramIncrement: 'Sprint 11',
            sprintNames: [
              'Sprint 11',
              'Sprint 12',
              'Sprint 13'
            ],
            piStartDate: '2024-07-25T00:00:00.000+00:00',
            piEndDate: '2024-10-22T00:00:00.000+00:00'
          },
          {
            programIncrementName: 'PI-7',
            numberOfSprints: 3,
            firstSprintOfProgramIncrement: 'Sprint 14',
            sprintNames: [
              'Sprint 14',
              'Sprint 15',
              'Sprint 16'
            ],
            piStartDate: '2024-10-23T00:00:00.000+00:00',
            piEndDate: '2024-11-21T00:00:00.000+00:00'
          },
          {
            programIncrementName: 'PI-8',
            numberOfSprints: 3,
            firstSprintOfProgramIncrement: 'Sprint 17',
            sprintNames: [
              'Sprint 17',
              'Sprint 18',
              'Sprint 19'
            ],
            piStartDate: '2024-11-22T00:00:00.000+00:00',
            piEndDate: '2024-12-31T00:00:00.000+00:00'
          }
        ]}
        addRecord={handleAddRecord}
        onExpanderClick={handleExpanderClick}
        milestones={[
          {
            title: "Kick-off",
            endDate: "03/31/2024",
            startDate: "Invalid date",
            status: "IN_PROGRESS"
        },
          {
              title: "Architecture Approved",
              endDate: "03/12/2024",
              startDate: "Invalid date",
              status: "IMPACTED"
          },
      ]}
        onMilestoneClick={() => alert()}
        onStageRowClick={(tasl) => alert(tasl)}
        onDateChange={handleTaskChange}
        handleWidth={5}
        onArrowDoubleClick={()=>alert()}
      />
    </div>
  );
}

export default App;
