import React from 'react';
import Post from './post/post';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import makeStyles from './style';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const classes = makeStyles();

  if (!posts && !isLoading) return 'No Posts';
  // Check if posts is undefined or null
  if (!posts) return null;

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {/* Check if posts is an array before using map */}
        {Array.isArray(posts) && posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
