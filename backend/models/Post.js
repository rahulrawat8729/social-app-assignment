const mongoose = require('mongoose');

// --- Embedded Comment Schema ---
// Defines the structure for each comment stored within a Post document
const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: { // Storing username directly for faster feed display
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxlength: 500,
    },
}, { timestamps: true });


// --- Post Schema ---
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: { // Storing username directly for faster feed display
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: String,
        default: '',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, // Array of User IDs who liked the post
        ref: 'User',
    }],
    comments: [CommentSchema], // Array of embedded comment documents
}, { timestamps: true });

// --- Custom Validation (Ensures EITHER text OR imageUrl exists) ---
PostSchema.path('text').validate(function (value) {
    if (!value && !this.imageUrl) {
        return false;
    }
    return true;
}, 'A post must contain either text or an image.');


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;