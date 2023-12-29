import React, { useState, useEffect, useCallback } from 'react';
import useStyles from './stylesss'
import memories from '../../images/memoriesLogo.png';

import memoriestext from '../../images/memoriesText.png';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
// ... other imports and code

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const Navigate = useNavigate();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.clear();
    Navigate('/');
    setuser(null);
  }, [dispatch, Navigate, setuser]);

  useEffect(() => {
    const fetchData = async () => {
      const token = user?.token;

      if (token) {
        const decodedtoken = jwtDecode(token);

        if (decodedtoken.exp * 1000 < new Date().getTime()) {
          logout();
        }
      }

      const userProfile = await JSON.parse(localStorage.getItem('profile'));

      if (userProfile) {
        setuser(userProfile);
      }
    };

    fetchData();
  }, [location, logout, user?.token, setuser]);

  const handleSignInClick = () => {
    console.log('Sign In button clicked'); // Add this log
    // ... other code
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriestext} alt="icon" height="45px" />
          <img className={classes.image} src={memories} alt="memories" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                {user?.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
              </Typography>
              <Button variant="contained" className={classes.Logout} color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary" onClick={handleSignInClick}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
