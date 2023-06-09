import React, { ChangeEvent, FormEvent } from 'react';
import '../styles/data.css';
import NavBar from './nabvar';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import theme from '../styles/theme';
import data from '../data/data';

const MyData = () => {
  const [dataStorage, setDataStorage] = React.useState(data.articles);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    console.log('effect');
  }, [search]);

  const topics = new Set(
    data.articles.flatMap((article) => article.Tags.topic),
  );
  const tl: string[] = [];
  topics.forEach((t) => tl.push(t));
  const topicList = tl.sort();
  const [topic, setTopic] = React.useState(topicList[0]);
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(search);
  };

  const handleOnTopicChange = (event: SelectChangeEvent) => {
    setTopic(event.target.value);
  };

  return (
    <main className="data-container">
      <NavBar />
      <div className="first-section-data-container">
        <Paper className="search-options-container" sx={{ padding: '1rem' }}>
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
        </Paper>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          size="small"
          aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                Title
              </TableCell>
              <TableCell sx={{ width: '40%', textAlign: 'center' }}>
                Content
              </TableCell>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                Language
              </TableCell>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                Tags
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataStorage.map((article) => (
              <TableRow
                key={`${article.Title}-${article.Date}-${article.url}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxHeight: '300px',
                  paddingBottom: '1rem',
                }}>
                <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                  {article.Title}
                </TableCell>
                <TableCell sx={{ width: '40%', overflow: 'scroll' }}>
                  {article.Content}
                </TableCell>
                <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                  {article.Language}
                </TableCell>
                <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                  {article.Tags.topic}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default MyData;
