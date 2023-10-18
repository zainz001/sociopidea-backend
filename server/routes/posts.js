import express from 'express';
import { getposts,createpost  } from '../controller/posts.js';
const router=express.Router();

router.get('/',getposts);
router.post('/',createpost);
export default router;