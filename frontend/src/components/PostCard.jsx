import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, TextField, Button, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

function PostCard({ initialPost, onUpdate }) {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(initialPost);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = post.likes.includes(user._id);
  const isAuthenticated = !!user;

  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      const token = user.token;
      const res = await axios.put(
        `${API_URL}/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update local state with the new post data
      setPost(res.data.post);
      // Call parent update function to refresh feed
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !isAuthenticated) return;

    try {
      const token = user.token;
      await axios.post(
        `${API_URL}/posts/${post._id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText('');
      // Force refresh the full feed after commenting to get updated post object
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Error commenting:', err);
    }
  };

  const fullImageUrl = post.imageUrl ? `http://localhost:5000${post.imageUrl}` : null;

  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ width: 40, height: 40, mr: 1 }}>{post.username[0].toUpperCase()}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {post.text}
        </Typography>
      </CardContent>

      {fullImageUrl && (
        <CardMedia
          component="img"
          image={fullImageUrl}
          alt="Post Image"
          sx={{ maxHeight: 350, objectFit: 'cover' }}
        />
      )}

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleLike} disabled={!isAuthenticated} color={isLiked ? "error" : "default"}>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary" mr={2}>
            {post.likes.length} Likes
          </Typography>

          <IconButton onClick={() => setShowComments(!showComments)}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.comments.length} Comments
          </Typography>
        </Box>
      </Box>

      {/* Comment Section */}
      {showComments && (
        <Box sx={{ p: 2, pt: 0, borderTop: '1px solid #eee' }}>
          {/* List existing comments */}
          {post.comments.slice().reverse().map((comment, index) => (
            <Box key={index} sx={{ mb: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold" component="span" mr={1}>
                {comment.username}
              </Typography>
              <Typography variant="body2" component="span">
                {comment.text}
              </Typography>
            </Box>
          ))}

          {/* New Comment Form */}
          {isAuthenticated && (
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 2, display: 'flex' }}>
              <TextField
                size="small"
                fullWidth
                label="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button type="submit" variant="contained" disabled={!commentText.trim()}>
                Post
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
}

export default PostCard;