
import postmessage from "../modules/postmessage.js";
import mongoose from "mongoose";

// Controller pattern implemented in all getpost, create etc responsible for handling specific HTTP requests and business logic.
export const getposts = async (req, res) => {
    try {
        const postmessages = await postmessage.find();

        console.log(postmessages);

        res.status(200).json(postmessages);
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