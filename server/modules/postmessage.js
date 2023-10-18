import mongoose from "mongoose";
const postschema=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedfile:String,
    likecount:{type:Number,
    default:0},

    createdat:{
        type:Date,
        default:new Date,
    },
});

const postmessage=mongoose.model('postmessage',postschema);

export default postmessage;