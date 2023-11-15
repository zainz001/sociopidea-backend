import React ,{ useEffect,useState }from "react";
import Post from '../posts/posts'
import Form from '../form/form'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../action/posts'

import { Container, Grow, Grid } from '@material-ui/core';
const Home = () => {
    const  [currentId,setcurrentId] = useState(0);
    //const classes = makeStyles();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId,dispatch]);
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={7} >
                        <Post setcurrentId={setcurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setcurrentId={setcurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home;