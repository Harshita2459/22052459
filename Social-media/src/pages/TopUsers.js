import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import UserCard from '../components/UserCard';
import { fetchUsers, fetchUserPosts } from '../services/api';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        
        // Convert users object to array and fetch post counts
        const usersArray = Object.entries(usersData).map(([id, name]) => ({ id, name }));
        
        // Fetch post counts for all users
        const usersWithPostCounts = await Promise.all(
          usersArray.map(async (user) => {
            const posts = await fetchUserPosts(user.id);
            return { ...user, postCount: posts.length };
          })
        );
        
        // Sort by post count and take top 5
        const sortedUsers = usersWithPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false);
      }
    };

    getTopUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Top Users by Post Count
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        topUsers.map((user) => (
          <UserCard key={user.id} user={user} postCount={user.postCount} />
        ))
      )}
    </Box>
  );
};

export default TopUsers;