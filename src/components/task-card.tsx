import React from 'react';
import '../styles/task-card.css';
import { Button, Card, LinearProgress, Typography } from '@mui/material';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { Status } from './my-tasks.tsx';

interface TaskCardData {
  title: string;
  description: string;
  deadline: string;
  status: Status;
  onDelete: () => void;
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
  // @ts-ignore
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
      <Button
        onClick={props.onDelete}
        variant={'outlined'}
        color={'error'}
        sx={{ width: '5rem' }}>
        <Typography variant={'subtitle2'}>Delete</Typography>
      </Button>
    </Card>
  );
};

export default TaskCard;
