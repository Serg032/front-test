import React, { ChangeEvent, FormEvent } from 'react';
import '../styles/app.css';
import { AppBar, Button, Grid, TextField, Typography } from '@mui/material';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

interface Props {
  maddynessImg: string;
  bfmImg: string;
  echosImg: string;
  techImg: string;
  pilars: string;
}
interface Image {
  imgUrl: string;
  description: string;
}

const LoginPage = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userEmail = process.env.REACT_APP_USEREMAIL;
  const userPassword = process.env.REACT_APP_PASSWORD;
  const navigate = useNavigate();
  const interval = 2500;

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
      localStorage.setItem('auth', 'true');
      navigate('/todo');
    } else if (email === userEmail && password !== userPassword) {
      alert('wrong password');
    } else if (email !== userEmail && password === userPassword) {
      alert('wrong email');
    } else {
      alert('wrong credentials');
    }
  };

  return (
    <Grid className="login-container">
      <Grid
        className="appbar-main-container"
        container
        display={{ sm: 'none', md: 'none' }}>
        <AppBar sx={{ background: theme.palette.primary.main }}>
          <Grid container className="app-bar-login-container">
            <Grid>
              <Typography>{'invyo'.toUpperCase()}</Typography>
            </Grid>
            <Grid>
              <Typography>Log in</Typography>
            </Grid>
          </Grid>
        </AppBar>
      </Grid>
      <Grid container className="login-main-content-container">
        <Grid container className="login-first-section-container">
          <Grid container className="login-first-texts-container">
            <Grid className="text-pilars-container">
              <Grid container className="strong-typo-container">
                <Typography variant="h5">
                  <strong className="strong-typo">The best ally</strong>
                </Typography>
                <Typography variant="h5">
                  <strong className="strong-typo">in managing</strong>
                </Typography>
                <Typography variant="h5">
                  <strong className="strong-typo">your data</strong>
                </Typography>
              </Grid>
              <Grid className="pilar-img-container">
                <img
                  className="pilars-img"
                  src={props.pilars}
                  alt="three-pilars"
                />
              </Grid>
            </Grid>
            <Grid>
              <Typography textAlign={'center'}>
                INVYO is a leading provider of technological solutions,
                specialized in data processing and analysis.
              </Typography>
            </Grid>
          </Grid>
          <Grid>
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
        </Grid>
        <Grid container className="login-form-container">
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
              sx={{ background: theme.palette.primary.main }}>
              <Typography>Log In</Typography>
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
