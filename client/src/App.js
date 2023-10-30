
import React, { useEffect,useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from './images/img.jpg';
import Post from './componenets/posts/posts'
import { useDispatch } from 'react-redux';
import Form from './componenets/form/form'
import makeStyles from './style'
import { getPosts } from './action/posts'
const App = () => {
  const  [currentId,setcurrentId] = useState(null);
  const classes = makeStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (

    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit" >
        <Typography className={classes.heading} variant="h2" align="center">memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
            <Grid item xs={12} sm={7} >
              <Post setcurrentId={setcurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4} >
              <Form currentId={currentId} setcurrentId={setcurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
export default App;