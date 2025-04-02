import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PostCard from '../components/PostCard';
import { fetchUsers, fetchUserPosts } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getFeedData = async () => {
      try {
        setLoading(true);
        
        // First fetch all users
        const usersData = await fetchUsers();
        setUsers(usersData);
        
        // Convert users object to array
        const usersArray = Object.entries(usersData).map(([id, name]) => ({ id, name }));
        
        // Fetch all posts from all users
        const allPosts = [];
        
        for (const user of usersArray) {
          const userPosts = await fetchUserPosts(user.id);
          const postsWithUser = userPosts.map(post => ({ ...post, user }));
          allPosts.push(...postsWithUser);
        }
        
        // Sort by post ID (assuming higher IDs are newer)
        const sortedPosts = allPosts.sort((a, b) => b.id - a.id);
        
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    getFeedData();
    
    // Set up polling for new posts every 30 seconds
    const intervalId = setInterval(() => {
      getFeedData();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Latest Posts
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} user={post.user} />
        ))
      )}
    </Box>
  );
};

export default Feed;