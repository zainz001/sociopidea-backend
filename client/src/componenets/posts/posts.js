import React from 'react';
import Post from './post/post';
import { Grid,CircularProgress } from '@material-ui/core';
import {  useSelector } from 'react-redux';
import makeStyles from './style'
const Posts = ({setcurrentId}) => {
    const post = useSelector((state) => state.post);
    const classes = makeStyles();
    
    console.log(post);
  
    return (
        !post.length? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {post.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                  <Post post={post} setcurrentId={setcurrentId}/>
                </Grid>
              ))}
            </Grid>
          )
    );
  };

export default Posts;


//   return (
//     !posts.length ? <CircularProgress /> : (
//       <Grid className={classes.container} container alignItems="stretch" spacing={3}>
//         {posts.map((post) => (
//           <Grid key={post._id} item xs={12} sm={6} md={6}>
//             <Post post={post} setCurrentId={setCurrentId} />
//           </Grid>
//         ))}
//       </Grid>
//     )
//   );
// };

// export default Posts;
