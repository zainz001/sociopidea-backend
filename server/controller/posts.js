import postmessage from "../modules/postmessage.js";
export const getposts=async (req,res)=>{
    try {
        const postmessage=await postMessage.find();

        console.log(postmessage);

        res.status(200).json(postmessage);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createpost=async (res,req)=>{
    const post=req.body;

    const newpost= new postmessage(post);
    try {
        await newpost.save();
        res.status(201).json(newpost);
    } catch (error) {
        res.status(401).json({message:error.message});
    }
}