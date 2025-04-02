import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Media Analytics
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Top Users
        </Button>
        <Button color="inherit" component={Link} to="/trending">
          Trending Posts
        </Button>
        <Button color="inherit" component={Link} to="/feed">
          Feed
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;