import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import useStyles from './style';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import {signup,signin} from '../../action/auth'
const initialstate = { firstName:'', lastname:'', email:'', password:'', confirmpassword:'' };

const Auth = () => {
    const Navigate = useNavigate();
    const classes = useStyles();
    const [formdata, setformdata] = useState(initialstate);
    const [showpassword, setshowpassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const handlesubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formdata,Navigate))
            
        }
        else{
            dispatch(signin(formdata,Navigate))
        }
    };

    const handlechange = (e) => {
        console.log("Event object:", e);
        console.log("Name:", e.target.name);
        console.log("Value:", e.target.value);
        setformdata({ ...formdata, [e.target.name]: e.target.value });
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

    const handleShowPassword = () => setshowpassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handlesubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Grid>
                                    <Input name="firstName" label="First Name" handlechange={handlechange} autoFocus half />
                                    <Input name="lastname" label="Last Name" handlechange={handlechange} half />
                                </Grid>
                            </>
                        )}
                        <Input name="email" label="Email Address" handlechange={handlechange} type="email" />
                        <Input
                            name="password"
                            label="Password"
                            handlechange={handlechange}
                            type={showpassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && <Input name="confirmpassword" label="Repeat Password" handlechange={handlechange} type="password" />}
                    </Grid>

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
                                {isSignup ? 'Already have an Account? Sign In ' : "Don't have an Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
