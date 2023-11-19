import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './style';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import { signin, signup } from '../../action/auth';

const initialstate = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmpassword: '',
};

const Auth = () => {
  const Navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useState(initialstate);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const validationResult = validateSignup();
      if (validationResult) {
        setError(validationResult);
        return;
      }

      dispatch(signup(formData, Navigate));
    } else {
      dispatch(signin(formData, Navigate));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(''); // Clear any existing errors when the user starts typing
  };

  const validateSignup = () => {
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/;
    if (!passwordRegex.test(formData.password)) {
      return 'Password must be 8 to 12 characters with at least one uppercase letter.';
    }

    // Email validation for signup
    const emailRegex = /^[a-zA-Z].*$/;
    if (!emailRegex.test(formData.email)) {
      return 'Email must start with an alphabet.';
    }

    // You can add more validations as needed

    return ''; // No validation errors
  };

  const googlerror = (error) => {
    console.log(error);
    console.log('Google sign-in failed. Try again later');
  };

  const googlesuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      Navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setFormData(initialstate);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setError(''); // Clear any existing errors when switching mode
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && <Input name="confirmpassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googlesuccess}
            onFailure={googlerror}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
