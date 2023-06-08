import React from 'react';
import '../styles/my-tasks.css';
import NavBar from './nabvar';
import { Button, Typography } from '@mui/material';
import AddTaskModal, { LStorage, tasksKey } from './add-task-modal';
import TaskCard from './task-card.tsx';

export type Status = 'In Progress' | 'Complete';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: Status;
}

const MyTasks = () => {
  const [tasks, setTasks] = React.useState<LStorage>({ items: [] });
  const [task, setTask] = React.useState<Task>({
    id: '',
    title: '',
    description: '',
    deadline: '',
    status: 'In Progress',
  });
  const [showCompletedTasks, setShowCompletedTasks] = React.useState(false);
  React.useEffect(() => {
    localStorage.getItem('tasks') === null
      ? setTasks({ items: [] })
      : setTasks(
          JSON.parse(localStorage.getItem('tasks') as string) as LStorage,
        );
  }, [showCompletedTasks]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const loadStorage = (): LStorage => {
      if (localStorage.getItem(tasksKey) === null) {
        return { items: [] };
      } else {
        return JSON.parse(localStorage.getItem(tasksKey) as string) as LStorage;
      }
    };
    localStorage.setItem(
      tasksKey,
      JSON.stringify({
        items: [
          ...loadStorage().items,
          { ...task, id: Math.floor(Math.random() * 10000) },
        ],
      }),
    );
    setTask({
      title: '',
      description: '',
      deadline: '',
      status: 'In Progress',
      id: '',
    });
    console.log('from ls', loadStorage());
    window.location.reload();
  };
  const confirmDeleteFunction = (id: string) => {
    const tasks: LStorage = JSON.parse(
      localStorage.getItem(tasksKey) as string,
    );
    const taskUpdated = tasks.items.filter((task) => task.id !== id);
    localStorage.setItem(
      tasksKey,
      JSON.stringify({ items: [...taskUpdated] } as LStorage),
    );
    window.location.reload();
  };
  const updateTask = (id: string) => {
    const tasks: LStorage = JSON.parse(
      localStorage.getItem(tasksKey) as string,
    );
    const foundTask = tasks.items.find((y) => y.id === id);
    const updatedTask: Task = {
      ...foundTask,
      status: foundTask?.status === 'Complete' ? 'In Progress' : 'Complete',
    } as Task;
    const tasksFiltered = tasks.items.filter((t) => t.id !== foundTask?.id);
    console.log(tasksFiltered);
    const tasksUpdated: Task[] = [...tasksFiltered, updatedTask];
    localStorage.setItem(
      tasksKey,
      JSON.stringify({ items: tasksUpdated } as LStorage),
    );
    console.log(tasksUpdated);
    window.location.reload();
  };
  const showCTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  return (
    <main className="tasks-main-container">
      <NavBar />
      <div className="tasks-add-section">
        <Button onClick={() => showCTasks()}>
          <Typography>{'show completed tasks'.toUpperCase()}</Typography>
        </Button>
        <AddTaskModal
          onSubmit={handleSubmit}
          setTaskState={setTask}
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          status={task.status}
        />
      </div>
      <div className="cards-container">
        {tasks.items.length === 0 ? (
          <Typography>You have no tasks</Typography>
        ) : showCompletedTasks ? (
          tasks.items
            .filter((tsk) => tsk.status === 'Complete' || 'In Progress')
            .map((t) => (
              <div key={t.id}>
                <TaskCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  deadline={t.deadline}
                  status={t.status}
                  confirmDelete={confirmDeleteFunction}
                  task={t}
                  update={updateTask}
                />
              </div>
            ))
        ) : (
          tasks.items
            .filter((tas) => tas.status === 'In Progress')
            .map((t) => (
              <div key={t.id}>
                <TaskCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  deadline={t.deadline}
                  status={t.status}
                  confirmDelete={confirmDeleteFunction}
                  task={t}
                  update={updateTask}
                />
              </div>
            ))
        )}
      </div>
    </main>
  );
};
export default MyTasks;
