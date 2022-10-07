const express = require('express');
const postController = require('../controllers/postController');
const { adminAuth } = require('../utils/adminAuth');
const router = express.Router();

router
  .get('/', postController.getAllPosts)
  .post('/', adminAuth, postController.addNewPost)
  .get('/:slug', postController.getExactPost)
  .patch('/:slug', adminAuth, postController.editExactPost)
  .delete('/:slug', adminAuth, postController.deleteExactPost);

module.exports = router;
