import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import BottomNavBar from '../components/BottomNavBar';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost'; // Imported the new component

const API_URL = import.meta.env.VITE_API_URL;

function SocialFeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch posts from the backend API
      const res = await axios.get(`${API_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ pb: 7 }}> {/* Padding bottom for the fixed BottomNavBar */}
      <Container component="main" maxWidth="md" sx={{ pt: 2, pb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Social Feed
        </Typography>

        {/* Integrated Create Post Component */}
        {/* The onPostCreated prop tells the feed to refresh after a successful post */}
        <CreatePost onPostCreated={fetchPosts} />

        {loading && <Typography align="center">Loading Feed...</Typography>}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && posts.length === 0 && !error && (
            <Typography align="center" color="textSecondary">No posts yet. Be the first to post!</Typography>
        )}

        {/* Render the posts */}
        {posts.map((post) => (
          <PostCard
            key={post._id}
            initialPost={post}
            onUpdate={fetchPosts}
          />
        ))}
      </Container>

      <BottomNavBar />
    </Box>
  );
}

export default SocialFeedPage;