const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
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
});

var postmessages = mongoose.model('postmessages', postSchema);

module.exports = postmessages;
