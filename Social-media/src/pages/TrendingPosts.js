import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PostCard from '../components/PostCard';
import { fetchUsers, fetchUserPosts, fetchPostComments } from '../services/api';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        setLoading(true);
        
        // First fetch all users
        const usersData = await fetchUsers();
        setUsers(usersData);
        
        // Convert users object to array
        const usersArray = Object.entries(usersData).map(([id, name]) => ({ id, name }));
        
        // Fetch all posts with their comment counts
        const allPostsWithComments = [];
        
        for (const user of usersArray) {
          const posts = await fetchUserPosts(user.id);
          
          // Fetch comment counts for each post
          const postsWithComments = await Promise.all(
            posts.map(async (post) => {
              const comments = await fetchPostComments(post.id);
              return { ...post, commentCount: comments.length, user };
            })
          );
          
          allPostsWithComments.push(...postsWithComments);
        }
        
        // Find the maximum comment count
        const maxComments = Math.max(...allPostsWithComments.map(p => p.commentCount));
        
        // Filter posts with max comments
        const trending = allPostsWithComments.filter(p => p.commentCount === maxComments);
        
        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingPosts();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trending Posts (Most Comments)
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        trendingPosts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            user={post.user} 
            commentCount={post.commentCount} 
          />
        ))
      )}
    </Box>
  );
};

export default TrendingPosts;