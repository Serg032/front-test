import React, { ChangeEvent, FormEvent } from 'react';
import { AppBar, Button, Grid, TextField, Typography } from '@mui/material';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userEmail = 'test@invyo.io';
  const userPassword = 'test123@';
  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === userEmail && password === userPassword) {
      alert('log in');
      navigate('/my-tasks');
    } else if (email === userEmail && password !== userPassword) {
      alert('wrong password');
    } else if (email !== userEmail && password === userPassword) {
      alert('wrong email');
    } else {
      alert('wrong credentials');
    }
  };

  return (
    <Grid
      sx={{
        background: theme.palette.primary.light,
        height: '100vh',
      }}
    >
      <AppBar sx={{ background: theme.palette.primary.main }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent={'space-between'}
          padding={'1rem'}
        >
          <Grid>
            <Typography>{'invyo'.toUpperCase()}</Typography>
          </Grid>
          <Grid>
            <Typography>Log in</Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Grid
        color="primary"
        width={'100%'}
        sx={{ background: theme.palette.primary.light, padding: '1rem' }}
        padding={'0'}
        margin={'0'}
        paddingTop={'6rem'}
      >
        <Grid>
          <Grid>
            <Grid paddingBottom={'2rem'}>
              <Typography variant="h5">
                <strong
                  style={{
                    background: theme.palette.primary.main,
                  }}
                >
                  The best ally
                </strong>
              </Typography>
              <Typography variant="h5">
                <strong
                  style={{
                    background: theme.palette.primary.main,
                  }}
                >
                  in managing
                </strong>
              </Typography>
              <Typography variant="h5">
                <strong
                  style={{
                    background: theme.palette.primary.main,
                  }}
                >
                  your data
                </strong>
              </Typography>
            </Grid>
            <Typography>
              INVYO is a leading provider of technological solutions,
              specialized in data processing and analysis.
            </Typography>
          </Grid>
        </Grid>
        <Grid paddingTop={'5rem'}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ background: theme.palette.primary.main }}
            >
              <Typography sx={{ color: theme.palette.primary.light }}>
                Log In
              </Typography>
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
