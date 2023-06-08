import React, { MouseEventHandler } from 'react';
import '../styles/task-card.css';
import { Button, Card, Grid, LinearProgress, Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { Status, Task } from './my-tasks.tsx';

interface TaskCardData {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: Status;
  confirmDelete: (id: string) => void;
  task: Task;
  update: (id: string) => void;
}

const TaskCard = (props: TaskCardData) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const deadline = new Date(props.deadline);
    const today = new Date();

    const timeDiff = Math.abs(deadline.getTime() - today.getTime());
    const totalDuration = Math.abs(
      deadline.getTime() - new Date('2023-01-01').getTime(),
    );
    const progressValue = ((totalDuration - timeDiff) / totalDuration) * 100;

    const normalizedProgress = Math.min(Math.max(progressValue, 0), 100);
    setProgress(normalizedProgress);
  }, []);

  return (
    <Card className="task-card-container">
      <div className={'card-first-section'}>
        <Typography variant={'subtitle1'}>
          {props.title.toUpperCase()}
        </Typography>
        <Box>
          <Chip color={props.status === 'In Progress' ? 'primary' : 'success'}>
            {props.status.toUpperCase()}
          </Chip>
        </Box>
      </div>
      <Typography variant={'subtitle2'}>{props.description}</Typography>
      <Typography variant={'subtitle2'}>Deadline: {props.deadline}</Typography>
      <LinearProgress
        color={'primary'}
        variant={'determinate'}
        value={progress}
      />
      <div className="card-buttons-container">
        <Button
          onClick={() => props.confirmDelete(props.task.id)}
          variant={'outlined'}
          color={'error'}
          sx={{ width: '5rem' }}>
          <Typography variant={'subtitle2'}>Delete</Typography>
        </Button>
        <Button
          onClick={() => props.update(props.task.id)}
          variant={'outlined'}
          color={'primary'}
          sx={{ width: '5rem' }}>
          <Typography variant={'subtitle2'}>Update</Typography>
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;
