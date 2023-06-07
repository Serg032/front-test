import React, { FormEvent } from 'react';
import '../styles/add-task-form.css';
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
import theme from '../styles/theme.ts';

type Event = React.ChangeEvent<HTMLInputElement>;

interface Props {
  onSubmit: (event: React.FormEvent<Element>) => void;
  titleChange: (event: Event) => void;
  descriptionChange: (event: Event) => void;
  deadlineChange: (event: Event) => void;
  statusChange: (event: SelectChangeEvent) => void;
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
  description: string;
  deadline: string;
  status: Status;
}

const AddTaskForm = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="add-task-form-container">
      <TextField
        required={true}
        className="add-task-login-text-field"
        label="title"
        type="text"
        value={props.title}
        onChange={props.titleChange}
        margin="normal"
      />
      <TextField
        className="add-task-login-text-field"
        label="description"
        multiline={true}
        rows={4}
        placeholder={'Write here'}
        type="text"
        value={props.description}
        onChange={props.descriptionChange}
        margin="normal"
      />
      <TextField
        required={true}
        InputLabelProps={{ shrink: true }}
        className="add-task-login-text-field"
        label="deadline"
        type="date"
        value={props.deadline}
        onChange={props.deadlineChange}
        margin="normal"
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
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
      <div className="add-task-form-container">
        <Button
          type={'submit'}
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main }}>
          <Typography>Create Task</Typography>
        </Button>
        <div onClick={props.onClose}>
          <Button type={'button'} variant="outlined" color={'error'}>
            <Typography color={'error'}>Cancel</Typography>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
