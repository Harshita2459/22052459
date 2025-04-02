import { Card, CardContent, Typography, Avatar, Chip } from '@mui/material';

const PostCard = ({ post, user, commentCount }) => {
  const avatarColor = `hsl(${user.id * 137.508 % 360}, 50%, 60%)`;
  const imageUrl = `https://picsum.photos/seed/${post.id}/600/300`;

  return (
    <Card sx={{ mb: 3 }}>
      <img 
        src={imageUrl} 
        alt="Post" 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Avatar sx={{ bgcolor: avatarColor, mr: 2 }}>
            {user.name.charAt(0)}
          </Avatar>
          <Typography variant="subtitle1">{user.name}</Typography>
        </div>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        {commentCount !== undefined && (
          <Chip 
            label={`${commentCount} comments`} 
            color="primary" 
            size="small" 
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;