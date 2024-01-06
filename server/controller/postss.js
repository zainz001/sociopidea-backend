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

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postmessage.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    // Check if the error is a Mongoose CastError (invalid ObjectId format)
    if (error instanceof mongoose.Error.CastError) {
      return res.status(404).json({ message: 'Invalid Post ID' });
    }
    // For other errors, return a generic 500 Internal Server Error
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};




const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = searchQuery ? new RegExp(searchQuery, 'i') : undefined;
    const tagsArray = tags ? tags.split(',') : [];

    const query = {};

    if (title) {
      query.$or = [
        { title },
        { tags: { $in: tagsArray } },
      ];
    } else {
      query.tags = { $in: tagsArray };
    }

    const posts = await postmessage.find(query);

    res.json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const post = await postmessage.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(value);

    const updatedPost = await postmessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {getPost,commentPost, getPostsBySearch,getposts, createpost, updatepost, deletepost, like };
