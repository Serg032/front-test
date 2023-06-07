import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Status } from './my-tasks';

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleChange: (event: Event) => void;
  descriptionChange: (event: Event) => void;
  deadlineChange: (event: Event) => void;
  statusChange: (event: SelectChangeEvent) => void;
  title: string;
  description: string;
  deadline: string;
  status: Status;
}

const AddTaskForm = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="add-task-form-container">
      <TextField
        className="add-task-login-text-field"
        label="title"
        type="text"
        value={props.title}
        onChange={props.titleChange}
        margin="normal"
      />
      <TextField
        className="login-text-field"
        label="description"
        type="text"
        value={props.description}
        onChange={props.descriptionChange}
        margin="normal"
      />
      <TextField
        className="login-text-field"
        label="deadline"
        type="date"
        value={props.deadline}
        onChange={props.deadlineChange}
        margin="normal"
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.status}
            label="Status"
            onChange={props.statusChange}>
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Complete'}>Complete</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="add-task-buttons-container">
        <Button type="submit" variant="contained">
          <Typography>Create Task</Typography>
        </Button>
        <Button variant="outlined">
          <Typography>Cancel</Typography>
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;