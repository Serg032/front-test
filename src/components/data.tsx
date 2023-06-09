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
  Typography,
} from '@mui/material';
import theme from '../styles/theme';
import data from '../data/data';

const MyData = () => {
  const [dataStorage, setDataStorage] = React.useState(data.articles);
  const [active, setActive] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showMore, setShowMore] = React.useState(5);

  React.useEffect(() => {
    if (searchTerm === '') {
      setDataStorage(data.articles.slice(0, showMore));
      setActive(false);
    } else {
      const dataFiltered = dataStorage.filter((article) =>
        article.Title.toLocaleLowerCase().includes(
          searchTerm.toLocaleLowerCase(),
        ),
      );
      setDataStorage(dataFiltered);
      setActive(false);
    }
  }, [active, showMore]);

  const topics = new Set(
    data.articles.flatMap((article) => article.Tags.topic),
  );
  const tl: string[] = [];
  topics.forEach((t) => tl.push(t));
  const topicList = tl.sort();
  const [topic, setTopic] = React.useState(topicList[0]);

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActive(true);
  };
  const handleOnTopicChange = (event: SelectChangeEvent) => {
    setTopic(event.target.value);
  };
  const handleShowMore = (event: unknown) => {
    setShowMore(showMore + 5);
  };
  const handleReset = (event: unknown) => {
    setShowMore(5);
    setSearchTerm('');
    setActive(true);
  };

  return (
    <main className="data-container">
      <NavBar />
      <div className="first-section-data-container">
        <Paper className="search-options-container">
          <form className="data-form" onSubmit={handleOnSubmit}>
            <TextField
              fullWidth
              value={searchTerm}
              placeholder="Search by title or content"
              type="text"
              onChange={handleOnChangeSearch}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ background: theme.palette.primary.main, width: '7rem' }}>
              Search
            </Button>
          </form>
          <div className="last-search-container">
            <Button onClick={handleReset} variant="outlined" color="error">
              Reset
            </Button>
          </div>
        </Paper>
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
              <TableRow
                sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  key={`${Math.floor(Math.random() * 1000000000)}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxHeight: '300px',
                    paddingBottom: '1rem',
                  }}>
                  <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                    <Typography>{article.Title}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: '40%', overflow: 'scroll' }}>
                    <Typography>{article.Content}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                    <Typography>{article.Language}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '20%',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    {article.Tags.topic.map((t) => (
                      <Typography key={t}>{t}</Typography>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button onClick={handleShowMore} variant="outlined">
            Show more
          </Button>
        </div>
      </div>
    </main>
  );
};

export default MyData;
