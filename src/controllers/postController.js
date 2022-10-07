const postModel = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json({ status: 'success', data: posts });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
};

exports.addNewPost = async (req, res) => {
  const newPost = new postModel({
    title: req.body.title,
    coverImage: req.body.coverImage,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    const savedPost = await newPost.save();
    res.json({ status: 'success', data: savedPost });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
};

exports.getExactPost = async (req, res) => {
  try {
    const post = await postModel.findOne({ slug: req.params.slug });
    res.json({ status: 'success', data: post });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
};

exports.editExactPost = async (req, res) => {
  try {
    const updatedPost = await postModel.updateOne(
      { slug: req.params.slug },
      { $set: req.body }
    );
    res.json({ status: 'success', data: updatedPost });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
};

exports.deleteExactPost = async (req, res) => {
  try {
    const removedPost = await postModel.remove({ slug: req.params.slug });
    res.json({ status: 'success', data: removedPost });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
};
