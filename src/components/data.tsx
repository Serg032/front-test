import React, { ChangeEvent, FormEvent } from 'react';
import '../styles/data.css';
import NavBar from './nabvar';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import theme from '../styles/theme';
import data from '../data/data';

const MyData = () => {
  const storage = data;
  const topics = new Set(
    data.articles.flatMap((article) => article.Tags.topic),
  );
  const tl: string[] = [];
  topics.forEach((t) => tl.push(t));
  const topicList = tl.sort();
  const [topic, setTopic] = React.useState(topicList[0]);
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleOnTopicChange = (event: SelectChangeEvent) => {
    setTopic(event.target.value);
  };

  return (
    <main className="data-container">
      <NavBar />
      <div className="first-section-data-container">
        <div className="search-options-container">
          <form className="data-form" onSubmit={handleOnSubmit}>
            <TextField fullWidth placeholder="Search by title or content" />
            <Button
              type="submit"
              variant="contained"
              sx={{ background: theme.palette.primary.main, width: '7rem' }}>
              Search
            </Button>
          </form>
          <Box>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Topic</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={topic}
                label={'all'}
                onChange={handleOnTopicChange}>
                {tl.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default MyData;
