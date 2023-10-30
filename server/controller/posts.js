
import postmessage from "../modules/postmessage.js";
import mongoose from "mongoose";
export const getposts=async (req,res)=>{
    try {
        const postmessages=await postmessage.find();

        console.log(postmessages);

        res.status(200).json(postmessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createpost = async (req, res) => { // <-- Corrected order of parameters
    const post = req.body;

    const newpost = new postmessage(post);
    try {
        await newpost.save();
        res.status(201).json(newpost);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}
export const updatepost = async(req,res)=> 
{
    const { id: _id } = req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no id available');
    const updatepost=await postmessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatepost);
}