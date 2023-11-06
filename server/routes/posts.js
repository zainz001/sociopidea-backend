import express from 'express';
import { getposts,createpost,deletepost,updatepost,like  } from '../controller/posts.js';
import auth from'../middleware/auth.js';

const router=express.Router();

router.get('/post',getposts);
router.post('/create',auth,createpost);
router.patch('/update/:id',auth, updatepost);
router.delete('/delete/:id',auth,deletepost);
router.patch('/like/:id',auth,like)
export default router;