import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useState } from 'react';


export default function Layout({children}: {children: React.ReactNode}) {
    const navigate = useNavigate();
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const isAuthenticated = !!localStorage.getItem("access_token");

    function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" elevation={0} sx={{borderBottom: '1px solid #ddd', bgcolor: 'white', color: 'black'}}>
                <Toolbar>
                    <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                        Neighborhood Library
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/books">Browse</Button>
                    {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">My Books</Button>
              <IconButton onClick={(e) => setAnchorElement(e.currentTarget)} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={() => setAnchorElement(null)}>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="primary" variant="contained" component={RouterLink} to="/signin">Sign In</Button>
          )}
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>{children}</Container>
        </Box>
    )
}