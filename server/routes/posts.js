import express from 'express';
import { getposts,createpost,deletepost,updatepost,like  } from '../controller/posts.js';
const router=express.Router();

router.get('/post',getposts);
router.post('/create',createpost);
router.patch('/update/:id', updatepost);
router.delete('/delete/:id',deletepost);
router.patch('/like/:id',like)
export default router;