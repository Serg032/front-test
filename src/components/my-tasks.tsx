import React from 'react';
import '../styles/my-tasks.css';
import NavBar from './nabvar';
import { Button, Grid, Typography } from '@mui/material';
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
  const [deleteConfirmStatus, setDeleteConfirmStatus] = React.useState(false);
  React.useEffect(() => {
    localStorage.getItem('tasks') === null
      ? setTasks({ items: [] })
      : setTasks(
          JSON.parse(localStorage.getItem('tasks') as string) as LStorage,
        );
  }, []);
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
  const handleDeleteStatus = (): void => {
    setDeleteConfirmStatus(true);
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
  };

  return (
    <main className="tasks-main-container">
      <NavBar />
      <div className="tasks-add-section">
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
        ) : (
          tasks.items.map((t) => (
            <div key={t.id}>
              <TaskCard
                key={t.id}
                id={t.id}
                title={t.title}
                description={t.description}
                deadline={t.deadline}
                status={t.status}
                confirmDelete={confirmDeleteFunction}
                deleteConfirmationStatus={handleDeleteStatus}
                task={t}
                deleteConfirmStatus={deleteConfirmStatus}
                setDeleteConfirmStatus={() => setDeleteConfirmStatus(false)}
              />
            </div>
          ))
        )}
      </div>
    </main>
  );
};
export default MyTasks;
