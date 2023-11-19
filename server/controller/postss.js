const postmessage = require("../modules/tt.js");
const mongoose = require("mongoose");

const getposts = async (req, res) => {
  try {
    const postmessages = await postmessage.find();
    console.log(postmessages);
    res.status(200).json(postmessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createpost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new postmessage({ ...post, creator: req.userId, createdAt: '2023-11-20T12:00:00Z' });
    await newPost.save();

    res.status(201).json(newPost.toObject()); // Return the newly created post in the response
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updatepost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no id available");
  const updatepost = await postmessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatepost);
};

const deletepost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no id available");
  await postmessage.findByIdAndRemove(id);
  res.json({ message: "Post Delete successfully" });
};

const like = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post ID" });
    }

    const post = await postmessage.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const index = post.likes.findIndex((userId) => userId === String(req.userId));

    if (index === -1) {
      // Like the post
      post.likes.push(req.userId);
    } else {
      // Dislike the post
      post.likes = post.likes.filter((userId) => userId !== String(req.userId));
    }

    const updatepost = await postmessage.findByIdAndUpdate(id, post, { new: true });

    res.json({ updatepost });
  } catch (error) {
    console.error("Error in like function:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getposts, createpost, updatepost, deletepost, like };
