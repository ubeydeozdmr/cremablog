const express = require('express');
const postController = require('../controllers/postController');
const postModel = require('../models/postModel');
const { adminAuth } = require('../utils/adminAuth');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/add', adminAuth, (req, res) => {
  res.render('add-post');
});

router.get('/:slug', async (req, res) => {
  const post = await postModel.findOne({ slug: req.params.slug });
  res.render('post', { post });
});

router.get('/:slug/edit', adminAuth, async (req, res) => {
  const post = await postModel.findOne({ slug: req.params.slug });
  res.render('edit-post', { post });
});

router.get('/:slug/delete', adminAuth, async (req, res) => {
  const post = await postModel.findOne({ slug: req.params.slug });
  res.render('delete-post', { post });
});

router.get('/', async (req, res) => {
  const posts = await postModel.find();
  res.render('index', { posts });
});

// router.get('/posts/new', adminAuth, (req, res) => {
//   res.render('create');
// });

module.exports = router;
