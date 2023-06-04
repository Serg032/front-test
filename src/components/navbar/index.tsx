import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { AppBar, Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../../styles/navBar.css';
import theme from '../../styles/theme';

function NavBar() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = () => setState(!state);
  const list: string[] = ['Home', 'Login', 'Personal Data'];

  return (
    <AppBar color="primary" sx={{ background: theme.palette.secondary.main }}>
      <Grid container className="navbar-container">
        <IconButton onClick={() => toggleDrawer()}>
          <MenuIcon
            color="primary"
            sx={{ color: theme.palette.primary.light }}
          />
        </IconButton>
        <Typography>{'invyo'.toUpperCase()}</Typography>
      </Grid>
      <Drawer open={state} onClose={() => toggleDrawer()}>
        <Grid
          className="drawer-links-container"
          color="secondary"
          sx={{ background: theme.palette.secondary.light }}
        >
          {list.map((item) => (
            <Typography
              style={{ padding: '1rem' }}
              color={'primary'}
              sx={{ color: theme.palette.primary.light }}
            >
              {item}
            </Typography>
          ))}
        </Grid>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
