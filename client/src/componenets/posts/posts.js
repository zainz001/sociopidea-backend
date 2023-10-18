import React from 'react';
import Post from './post/post';
import {  useSelector } from 'react-redux';
import makeStyles from './style'
const Posts=()=>{
    const posts=useSelector((state)=>
        state.posts
        );
    const classes=makeStyles();
    console.log(posts);
    return(
        <>
                <h1>posts</h1>
        <Post />

        <Post />
        </>

    )
}
export default Posts;

