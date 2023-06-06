import React from 'react';
import '../styles/my-tasks.css';
import NavBar from './nabvar';
import NestedModal from './add-task-modal';
import { Typography } from '@mui/material';

type Status = 'In Progress' | 'Complete';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: Status;
}

const MyTasks = () => {
  const [newTask, setNewTask] = React.useState({});
  const tasks: Task[] = [];
  const addTask = (task: Task) => {
    setNewTask(task);
  };

  return (
    <main className="tasks-main-container">
      <NavBar />
      <div className="tasks-add-section">
        <NestedModal />
      </div>
      <div className="test">
        {tasks.length === 0 ? (
          <Typography>You have no tasks</Typography>
        ) : (
          <Typography>Tasks</Typography>
        )}
      </div>
    </main>
  );
};
export default MyTasks;
