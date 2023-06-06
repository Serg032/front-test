import React, { ChangeEvent, FormEvent } from 'react';
import '../styles/app.css';
import { AppBar, Button, TextField, Typography } from '@mui/material';
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
    localStorage.getItem('auth') ? navigate('/todo') : undefined;
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
    <div className="login-container">
      <div className="appbar-main-container">
        <AppBar sx={{ background: theme.palette.primary.main }}>
          <div className="app-bar-login-container">
            <div>
              <Typography>{'invyo'.toUpperCase()}</Typography>
            </div>
            <div>
              <Typography>Log in</Typography>
            </div>
          </div>
        </AppBar>
      </div>
      <div className="login-main-content-container">
        <div className="login-first-section-container">
          <div className="login-first-texts-container">
            <div className="text-pilars-container">
              <div className="strong-typo-container">
                <Typography variant="h5">
                  <strong className="strong-typo">The best ally</strong>
                </Typography>
                <Typography variant="h5">
                  <strong className="strong-typo">in managing</strong>
                </Typography>
                <Typography variant="h5">
                  <strong className="strong-typo">your data</strong>
                </Typography>
              </div>
              <div className="pilar-img-container">
                <img
                  className="pilars-img"
                  src={props.pilars}
                  alt="three-pilars"
                />
              </div>
            </div>
            <div>
              <Typography className="login-leading-text" textAlign={'center'}>
                INVYO is a leading provider of technological solutions,
                specialized in data processing and analysis.
              </Typography>
            </div>
          </div>
          <div>
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
          </div>
        </div>
        <div className="login-form-container">
          <Typography className="form-text">
            If you have an account you can access to INVYO utilies.
          </Typography>
          <form onSubmit={handleSubmit} className="form-container">
            <TextField
              className="login-text-field"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              margin="normal"
            />
            <TextField
              className="login-text-field"
              label="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ background: theme.palette.primary.main, width: '7rem' }}>
              <Typography>Log In</Typography>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
