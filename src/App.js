
import React from 'react';
import { Container, AppBar , Typography,Grow,Grid } from '@material-ui/core';
import memories from './images/img.jpg';
import Post from './componenets/posts/posts'
import Form from './componenets/form/form'
import makeStyles from './style'
const app=()=>{
  const classes=makeStyles();
  return(
    
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit" >
        <Typography className={classes.heading} variant="h2" align="center">memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3} >
            <Grid item xs={12} sm={7} >
              <Post/>
            </Grid>
            <Grid item xs={12} sm={4} >
            <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
export default app;