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
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [newTask, setNewTask] = React.useState<Task>({
    id: '',
    title: '',
    description: '',
    deadline: '',
    status: 'In Progress',
  });
  const [updatedTasks, setUpdatedTasks] = React.useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = React.useState(false);
  React.useEffect(() => {
    localStorage.getItem('tasks') !== null
      ? setTasks(JSON.parse(localStorage.getItem('tasks') as string))
      : undefined;
    setUpdatedTasks(false);
  }, [updatedTasks]);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTask.title !== '') {
      const updatedTasks = [
        ...tasks,
        { ...newTask, id: Math.floor(Math.random() * 10000).toString() },
      ];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask({
        id: '',
        description: '',
        deadline: '',
        status: 'In Progress',
        title: '',
      });
    } else {
      alert('Title needed');
    }
    setUpdatedTasks(true);
  };

  const handleDeleteTask = (id: string) => {
    const getStorage = JSON.parse(
      localStorage.getItem('tasks') as string,
    ) as Task[];
    const storageUpdated = getStorage.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(storageUpdated as Task[]));
    setUpdatedTasks(true);
  };

  const updateTask = (id: string) => {
    const getStorage: Task[] = JSON.parse(
      localStorage.getItem('tasks') as string,
    );
    const taskToUpdate = tasks.find((t) => t.id === id) as Task;
    const storageFiltered = tasks.filter((t) => t.id !== id);
    const storageUpdated: Task[] = [
      ...storageFiltered,
      {
        ...taskToUpdate,
        status: taskToUpdate.status === 'Complete' ? 'In Progress' : 'Complete',
      },
    ];
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        ...storageFiltered,
        {
          ...taskToUpdate,
          status:
            taskToUpdate.status === 'Complete' ? 'In Progress' : 'Complete',
        },
      ] as Task[]),
    );
    setUpdatedTasks(true);
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
          onSubmit={handleAddTask}
          setTaskState={setNewTask}
          title={newTask.title}
          description={newTask.description}
          deadline={newTask.deadline}
          status={newTask.status}
        />
      </div>
      <div className="cards-container">
        {tasks.length === 0 ? (
          <Typography>You have no tasks</Typography>
        ) : showCompletedTasks ? (
          tasks
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
                  confirmDelete={handleDeleteTask}
                  task={t}
                  update={updateTask}
                />
              </div>
            ))
        ) : (
          tasks
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
                  confirmDelete={handleDeleteTask}
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
