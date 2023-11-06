// import mongoose from "mongoose";
// const postschema=mongoose.Schema({
//     title:String,
//     message:String,
//     creator:String,
//     tags:[String],
//     selectedfile:String,
//     likecount:{type:Number,
//     default:0},

//     createdat:{
//         type:Date,
//         default:new Date,
//     },
// });

// const postmessage=mongoose.model('postmessage',postschema);

// export default postmessage;
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var postmessages = mongoose.model('postmessages', postSchema);

export default postmessages;