import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Alert, IconButton, Typography, Card, CardContent, Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

function CreatePost({ onPostCreated }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Require either text or an image
    if (!text.trim() && !image) {
      setError('Post must contain text or an image.');
      return;
    }

    setLoading(true);

    // Use FormData for text and file submission
    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = user.token;
      await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form and state
      setText('');
      setImage(null);

      // Trigger the feed to refresh
      onPostCreated();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 1 }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Create Post
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={handleFileChange}
                            sx={{ display: 'none' }}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                component="span"
                                disabled={loading}
                            >
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        {image && (
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {image.name}
                            </Typography>
                        )}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || (!text.trim() && !image) || !isAuthenticated}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                </Box>
            </Box>
        </CardContent>
    </Card>
  );
}

export default CreatePost;