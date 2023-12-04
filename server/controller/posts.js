
import postmessage from "../modules/postmessage.js";
import mongoose from "mongoose";

export const getposts = async (req, res) => {
    
    const {page}=req.query
    try {
        const LIMIT=8;
        const startindex=(Number(page)-1)*LIMIT;//get the starting index of every page
        const total=await postmessage.countDocuments({}); //how many post are in the database 
        const post = await postmessage.find().sort({_id:-1}).limit(LIMIT).skip(startindex);//this give us the newest post first


        res.status(200).json({data:post,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
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

        const posts = await postmessage.find(query);

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const createpost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new postmessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updatepost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no id available');
    const updatepost = await postmessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatepost);
}

export const deletepost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no id available');
    await postmessage.findByIdAndRemove(id);
    res.json({ message: 'Post Delete successfully' })
}

export const like = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.json({ message: 'UnAuthorized' })
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no id available');
    const post = await postmessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index===-1) {
        //like the post 
        post.likes.push(req.userId)

    } else {
        post.likes=post.likes.filter((id)=>id !== String(req.userId)); 
        //dislike the post
    }
    const updatepost = await postmessage.findByIdAndUpdate(id, post, { new: true });

    res.json({ updatepost })

}