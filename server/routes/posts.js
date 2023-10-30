import express from 'express';
import { getposts,createpost,updatepost  } from '../controller/posts.js';
const router=express.Router();

router.get('/',getposts);
router.post('/',createpost);
router.patch('/:id', updatepost);
export default router;