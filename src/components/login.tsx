import React, { ChangeEvent, FormEvent } from 'react';
import '../styles/app.css';
import { AppBar, Button, Grid, TextField, Typography } from '@mui/material';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';

interface Props {
  maddynessImg: string;
  bfmImg: string;
  echosImg: string;
  techImg: string;
}
interface Image {
  imgUrl: string;
  description: string;
}

const LoginPage = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userEmail = 'test@invyo.io';
  const userPassword = 'test123@';
  const navigate = useNavigate();
  const interval = 2000;

  const images: Image[] = [
    {
      imgUrl: props.maddynessImg,
      description: 'maddyness',
    },
    {
      imgUrl: props.bfmImg,
      description: 'bfm',
    },
    {
      imgUrl: props.echosImg,
      description: 'lesechos',
    },
    {
      imgUrl: props.techImg,
      description: 'technologies',
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

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
        height={'100%'}
        sx={{ background: theme.palette.primary.light, padding: '1rem' }}
        padding={'0'}
        margin={'0'}
        paddingTop={'5rem'}
        display={'flex'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Grid>
          <Grid>
            <Grid
              container
              paddingBottom={'2rem'}
              direction={'column'}
              gap={'0.7rem'}
            >
              <Typography variant="h5">
                <strong
                  style={{
                    background: theme.palette.primary.main,
                    padding: '0.3rem',
                    borderRadius: '5px',
                  }}
                >
                  The best ally
                </strong>
              </Typography>
              <Typography variant="h5">
                <strong
                  style={{
                    background: theme.palette.primary.main,
                    padding: '0.3rem',
                    borderRadius: '5px',
                  }}
                >
                  in managing
                </strong>
              </Typography>
              <Typography variant="h5">
                <strong
                  style={{
                    background: theme.palette.primary.main,
                    padding: '0.3rem',
                    borderRadius: '5px',
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
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {images.map((image, i) => (
            <img
              key={i}
              src={image.imgUrl}
              alt={`${image.description}-image`}
              style={{
                display: i === currentIndex ? 'block' : 'none',
                width: '250px',
                borderRadius: '15px',
              }}
            />
          ))}
        </Grid>
        <Grid>
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
