import * as React from 'react';
import '../styles/modal.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import theme from '../styles/theme';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, SelectChangeEvent, Typography } from '@mui/material';
import AddTaskForm from './add-task-form';
import { Status, Task } from './my-tasks';

interface LStorage {
  items: Task[] | [];
}

const style = {
  position: 'absolute' as 'absolute',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  width: 400,
  bgcolor: theme.palette.primary.light,
  boxShadow: 24,
};

export default function AddTaskModal() {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState<Task>({
    id: '',
    title: '',
    description: '',
    deadline: '',
    status: 'In Progress',
  });
  const tasksKey = 'tasks';
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevState) => ({ ...prevState, title: event.target.value }));
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTask((prevState) => ({ ...prevState, description: event.target.value }));
  };
  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prevState) => ({ ...prevState, deadline: event.target.value }));
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    setTask((prevState) => ({
      ...prevState,
      status: event.target.value as Status,
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadStorage = (): LStorage => {
      if (localStorage.getItem(tasksKey) === null) {
        return { items: [] };
      } else {
        return JSON.parse(localStorage.getItem(tasksKey) as string) as LStorage;
      }
    };
    // const charged = loaded.items.push({ ...task } as Task);
    localStorage.setItem(
      tasksKey,
      JSON.stringify({
        items: [
          ...loadStorage().items,
          { ...task, id: Math.floor(Math.random() * 10000) },
        ],
      }),
    );
    console.log('from ls', loadStorage());
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddIcon />
        <Typography>{'add task'.toUpperCase()}</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box sx={{ ...style }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <h2 id="parent-modal-title">Add new task</h2>
          <AddTaskForm
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            status={task.status}
            titleChange={handleTitleChange}
            descriptionChange={handleDescriptionChange}
            deadlineChange={handleDeadlineChange}
            statusChange={handleStatusChange}
            onSubmit={handleSubmit}
          />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ xs: { ...style } }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
