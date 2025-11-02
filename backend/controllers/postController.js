const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    const { text } = req.body;
    let imageUrl = '';

    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!text && !imageUrl) {
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '..', imageUrl));
        }
        res.status(400).json({ message: 'Post must contain either text or an image' });
        return;
    }

    try {
        const post = await Post.create({
            userId: req.user._id,
            username: req.user.username,
            text,
            imageUrl,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
    }

    try {
        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes.pull(userId);
            await post.save();
            res.json({ message: 'Post unliked successfully', post });
        } else {
            post.likes.push(userId);
            await post.save();
            res.json({ message: 'Post liked successfully', post });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const commentOnPost = async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text) {
        res.status(400).json({ message: 'Comment text is required' });
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Invalid post ID' });
        return;
    }

    const newComment = {
        userId: req.user._id,
        username: req.user.username,
        text,
    };

    try {
        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        // Add the new comment object to the embedded comments array
        post.comments.push(newComment);
        await post.save();

        // Return the last added comment for immediate frontend display
        res.status(201).json(post.comments[post.comments.length - 1]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    likePost,
    commentOnPost,
};