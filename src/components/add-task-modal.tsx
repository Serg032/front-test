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

interface Props {
  onSubmit: (event: React.FormEvent<Element>) => void;
  setTaskState: React.Dispatch<React.SetStateAction<Task>>;
  title: string;
  description: string;
  deadline: string;
  status: Status;
}

export interface LStorage {
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

export const tasksKey = 'tasks';

export default function AddTaskModal(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTaskState((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    props.setTaskState((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };
  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTaskState((prevState) => ({
      ...prevState,
      deadline: event.target.value,
    }));
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    props.setTaskState((prevState) => ({
      ...prevState,
      status: event.target.value as Status,
    }));
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
          <AddTaskForm
            title={props.title}
            description={props.description}
            deadline={props.deadline}
            status={props.status}
            titleChange={handleTitleChange}
            descriptionChange={handleDescriptionChange}
            deadlineChange={handleDeadlineChange}
            statusChange={handleStatusChange}
            onSubmit={props.onSubmit}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
// const handleSubmit = (event: React.FormEvent) => {
{
  /*  event.preventDefault();*/
}
{
  /*  const loadStorage = (): LStorage => {*/
}
{
  /*    if (localStorage.getItem(tasksKey) === null) {*/
}
{
  /*      return { items: [] };*/
}
{
  /*    } else {*/
}
{
  /*      return JSON.parse(localStorage.getItem(tasksKey) as string) as LStorage;*/
}
{
  /*    }*/
}
//   };
//   localStorage.setItem(
//     tasksKey,
//     JSON.stringify({
//       items: [
//         ...loadStorage().items,
//         { ...task, id: Math.floor(Math.random() * 10000) },
{
  /*      ],*/
}
{
  /*    }),*/
}
{
  /*  );*/
}
//   setTask({
//     title: '',
//     description: '',
//     deadline: '',
//     status: 'In Progress',
//     id: '',
//   });
//   console.log('from ls', loadStorage());
// };
