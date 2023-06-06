import * as React from 'react';
import './../styles/navbar.css';
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
  const urlParams = useLocation();
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
          }}
        />
      ),
    },
  ];

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
      <div className="appbar-container">
        <IconButton onClick={() => toggleDrawer()}>
          <MenuIcon
            color="primary"
            sx={{
              color: theme.palette.primary.light,
            }}
          />
        </IconButton>
        <Typography sx={{ paddingRight: '1rem' }}>{buildTitle()}</Typography>
      </div>
      <Drawer open={state} onClose={() => toggleDrawer()}>
        <div className="drawer-container">
          <Typography className="navbar-title">
            <Box component={'span'}>INVYO</Box>
          </Typography>
          <div className="drawer-buttons-container">
            {list.map((item) => (
              <Button
                key={item.path}
                onClick={item.path === 'Log Out' ? () => logout() : undefined}>
                <div className="drawer-button">
                  {item.icon}
                  <Typography
                    style={{ padding: '1rem' }}
                    color={'primary'}
                    variant="inherit"
                    sx={{ color: theme.palette.primary.light }}>
                    <Box component={'span'}>{item.path}</Box>
                  </Typography>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
