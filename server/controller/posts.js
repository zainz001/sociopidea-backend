
import postSchema from "../modules/postmessage.js";
import mongoose from "mongoose";
import  express  from "express";
const router =express.Router();


export const getposts = async (req, res) => {
    
    const {page}=req.query
    try {
        const LIMIT=8;
        const startindex=(Number(page)-1)*LIMIT;//get the starting index of every page
        const total=await postSchema.countDocuments({}); //how many post are in the database 
        const post = await postSchema.find().sort({_id:-1}).limit(LIMIT).skip(startindex);//this give us the newest post first


        res.status(200).json({data:post,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getpost = async (req, res) => {
    const {id}=req.params;
    try {
        
        const post= await postSchema.findById(id);

        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



//params is used for only 1 specific search 
export const getpostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = searchQuery ? new RegExp(searchQuery, "i") : undefined;
        const tagsArray = tags ? tags.split(',') : [];

        const query = {};

        if (title) {
            query.$or = [
                { title },
                { tags: { $in: tagsArray } }
            ];
        } else {
            query.tags = { $in: tagsArray };
        }

        const posts = await postSchema.find(query);

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const createpost = async (req, res) => {
    const post = req.body;

    const newpostSchema = new postSchema({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newpostSchema.save();

        res.status(201).json(newpostSchema);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatepost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no id available');
    const updatepost = await postSchema.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatepost);
}

export const deletepost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no id available');
    await postSchema.findByIdAndRemove(id);
    res.json({ message: 'Post Delete successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postSchema.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postSchema.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}



export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await postSchema.findById(id);

    post.comments.push(value);

    const updatedPost = await postSchema.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
export default router;