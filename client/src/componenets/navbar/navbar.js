import React from 'react';
import makeStyles from './style'
import memories from '../../images/img.jpg';
import {AppBar,Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const classes =makeStyles();
    return (
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <div className={classes.brandContainer} >
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="40" />
        
            </div>
        </AppBar>
    )
}
export default Navbar;