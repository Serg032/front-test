import { createTheme } from '@mui/material/styles';
import { grey, orange, purple, red, teal } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: teal[500],
    },
    secondary: {
      main: purple[500],
    },
    error: {
      main: red[500],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[500],
    },
    secondary: {
      main: orange[500],
    },
    error: {
      main: red[500],
    },
  },
});

export { lightTheme, darkTheme };
