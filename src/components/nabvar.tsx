import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface DrawerList {
  path: string;
  icon: React.ReactNode;
}

function NavBar() {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const toggleDrawer = () => setState(!state);
  React.useEffect(() => {
    if (localStorage.getItem('auth') !== 'true') {
      alert('not logged');
      navigate('/login');
    }
  }, [localStorage]);
  const list: DrawerList[] = [
    {
      path: 'My Data',
      icon: (
        <DataSaverOffIcon
          sx={{
            color: theme.palette.primary.light,
            fontSize: { xs: '30px', sm: '50px' },
          }}
        />
      ),
    },
    {
      path: 'My Tasks',
      icon: (
        <AssignmentIcon
          sx={{
            color: theme.palette.primary.light,
            fontSize: { xs: '30px', sm: '50px' },
          }}
        />
      ),
    },
    {
      path: 'Log Out',
      icon: (
        <LogoutIcon
          sx={{
            color: theme.palette.primary.light,
            fontSize: { xs: '30px', sm: '50px' },
          }}
        />
      ),
    },
  ];
  const urlParams = useLocation();

  const buildTitle = (): string => {
    let title: string = '';
    if (urlParams.pathname === '/todo') {
      title = urlParams.pathname.replace('/todo', 'my tasks');
    }
    return title.toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <AppBar color="primary" sx={{ background: theme.palette.primary.main }}>
      <Grid
        container
        direction={'row'}
        justifyContent={'space-between'}
        padding={'1rem'}
        alignItems={'center'}>
        <IconButton onClick={() => toggleDrawer()}>
          <MenuIcon
            color="primary"
            sx={{
              color: theme.palette.primary.light,
              fontSize: { xs: '25px', sm: '50px' },
            }}
          />
        </IconButton>
        <Typography>{buildTitle()}</Typography>
      </Grid>
      <Drawer open={state} onClose={() => toggleDrawer()}>
        <Typography
          padding={'1rem'}
          display={'flex'}
          alignItems={'center'}
          width={'100%'}
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.light,
          }}>
          <Box component={'span'} sx={{ typography: { xs: 'h6', sm: 'h4' } }}>
            INVYO
          </Box>
        </Typography>
        <Grid
          container
          color="secondary"
          sx={{ background: theme.palette.primary.main }}
          display={'flex'}
          direction={'column'}
          height={'100vh'}>
          {list.map((item) => (
            <Button
              key={item.path}
              sx={{ width: '100%' }}
              onClick={item.path === 'Log Out' ? () => logout() : undefined}>
              <Grid
                container
                display={'flex'}
                direction={'row'}
                alignItems={'center'}
                mt={{ sm: '2rem' }}
                gap={{ xs: '2rem', sm: '3rem' }}
                justifyContent={'center'}
                padding={'1rem'}
                width={'100%'}>
                {item.icon}
                <Typography
                  style={{ padding: '1rem' }}
                  color={'primary'}
                  sx={{ color: theme.palette.primary.light }}>
                  <Box
                    component={'span'}
                    sx={{ typography: { xs: 'h6', sm: 'h4' } }}>
                    {item.path}
                  </Box>
                </Typography>
              </Grid>
            </Button>
          ))}
        </Grid>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
