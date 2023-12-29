    import React, { useState, useEffect } from "react";
    import { TextField, Button, Typography, Paper } from "@material-ui/core";
    import FileBase from 'react-file-base64';
    import { useDispatch, useSelector } from 'react-redux';
    import useStyles from './style';
    import { createpost, updatepost } from '../../action/posts';
    import {useNavigate} from 'react-router-dom';
    const Form = ({ currentId, setCurrentId }) => {
        const classes = useStyles();
        const user = JSON.parse(localStorage.getItem('profile'));
        const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
        const [postData, setPostData] = useState({
            title: '', message: '', tags: '', selectedFile: ''
        });
        const dispatch = useDispatch();
        const navigate=useNavigate();
        useEffect(() => {
            if (post) setPostData(post);
        }, [post])
        const handleSubmit = (e) => {
            e.preventDefault();
            if (currentId===0) {
                dispatch(updatepost(currentId, { ...postData, name: user?.result?.name }));
                
                clear();
            } else {
                dispatch(createpost({ ...postData, name: user?.result?.name },navigate));// ":" this represent = to
                clear();
            }

        }
        const clear = () => {
            setCurrentId(null);
            setPostData({
                title: '', message: '', tags: '', selectedFile: ''
            });
        }
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper} >
                <Typography variant="h6" align="center" >
                Please Sign in First 
                </Typography>

            </Paper>
        )
    }

        return (
            <Paper className={classes.paper} elevation={6} >
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <div className={classes.fileInput} >
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit " fullWidth>Submit </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear </Button>

                </form>


            </Paper>
        )
    }
    export default Form;

