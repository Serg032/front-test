import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { AppBar, Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../styles/theme';
import { useLocation, useSearchParams } from 'react-router-dom';

function NavBar() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = () => setState(!state);
  const list: string[] = ['My Data', 'My Tasks', 'Log Out'];
  const urlParams = useLocation();

  return (
    <AppBar color="primary" sx={{ background: theme.palette.primary.main }}>
      <Grid
        container
        direction={'row'}
        justifyContent={'space-between'}
        padding={'1rem'}
        alignItems={'center'}
      >
        <IconButton onClick={() => toggleDrawer()}>
          <MenuIcon
            color="primary"
            sx={{ color: theme.palette.primary.light }}
          />
        </IconButton>
        <Typography>
          {urlParams.pathname.toUpperCase().replace(/[\/-]/g, ' ')}
        </Typography>
      </Grid>
      <Drawer open={state} onClose={() => toggleDrawer()}>
        <Grid
          color="secondary"
          sx={{ background: theme.palette.primary.main }}
          height={'100vh'}
        >
          {list.map((item) => (
            <Typography
              key={item}
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
