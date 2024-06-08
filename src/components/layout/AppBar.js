import * as React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

export default function ButtonAppBar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Finance Manager
          </Typography>
          <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => router.push('/protected')}>Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => router.push('/auth/login')}>Sign In</Button>
              <Button color="inherit" onClick={() => router.push('/auth/register')}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
