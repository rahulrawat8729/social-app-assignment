const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createPost, getAllPosts, likePost, commentOnPost } = require('../controllers/postController');
const upload = require('../utils/upload');

const router = express.Router();

router.route('/')
    .get(getAllPosts)
    .post(protect, upload, createPost);

router.route('/:postId/like')
    .put(protect, likePost);

router.route('/:postId/comment')
    .post(protect, commentOnPost);

module.exports = router;