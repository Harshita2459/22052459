import { Card, CardContent, Typography, Avatar } from '@mui/material';

const UserCard = ({ user, postCount }) => {
  // Generate a random avatar color based on user ID
  const avatarColor = `hsl(${user.id * 137.508 % 360}, 50%, 60%)`;
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: avatarColor, mr: 2 }}>
          {user.name.charAt(0)}
        </Avatar>
        <div>
          <Typography variant="h6">{user.name}</Typography>
          <Typography color="text.secondary">
            {postCount} posts
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;