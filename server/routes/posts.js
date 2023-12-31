import express from 'express';
import { getposts,getpostsBySearch,getpost,createpost,deletepost,commentPost,updatepost,likePost  } from '../controller/posts.js';
import auth from'../middleware/auth.js';

const router=express.Router();

router.get('/post',getposts);
router.get('/post/:id',getpost);

router.get('/search',getpostsBySearch);
router.post('/create',auth,createpost);
router.patch('/update/:id',auth, updatepost);
router.delete('/delete/:id',auth,deletepost);
router.patch('/:id/likePost', auth, likePost);
router.post('/comment/:id',auth,commentPost)
export default router;