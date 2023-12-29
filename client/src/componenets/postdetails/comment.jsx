import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from './styles';
import { commentPost } from '../../action/posts';

const Commentsection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentRef = useRef();

  useEffect(() => {
    setComments(post?.comments || []);
  }, [post]);

  const handleClick = async () => {
    const finalComment = `${user.result.name}:${comment}`;
    const newCommentData = await dispatch(commentPost(finalComment, post._id));

    if (newCommentData && newCommentData.comments) {
      setComments(newCommentData.comments);
      setComment('');
    }
    commentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
  <Typography key={i} gutterBottom variant="subtitle1">
    {c && c.includes(':') ? (
      <>
        <strong>{c.split(':')[0]}:</strong> {c.split(':').slice(1).join(':')}
      </>
    ) : (
      c // Display the entire comment if no colon is present
    )}
  </Typography>
))}

 
          <div ref={commentRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField
            fullWidth
            minRows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Commentsection;
