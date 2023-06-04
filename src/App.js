import React from 'react';
import './styles/app.css'
import logo from './assets/logo.jpeg'
import NavBar from './components/navbar/index.tsx'
import { Grid, ThemeProvider } from '@mui/material';
import theme from './styles/theme.ts'
function App() {
  return (
    <ThemeProvider theme={theme}>
    <Grid>
      <NavBar imagePath={logo}/>
    </Grid>
    </ThemeProvider>
  )
}
export default App;
