import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

function RoleSpecificRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, userId } = location.state || { role: 'candidate', userId: null }; // Ensure userId is passed

  const handleFormNavigation = () => {
    switch (role) {
      case 'admin':
        navigate('/admin/register', { state: { userId } }); // Replace with actual path for admin registration
        break;
      case 'candidate':
        navigate('/candidate/register', { state: { userId } }); // Replace with actual path for candidate registration
        break;
      case 'hiring_manager':
        navigate('/hiring-manager/register', { state: { userId } }); // Replace with actual path for hiring manager registration
        break;
      default:
        navigate('/'); // Fallback to home
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {`Welcome ${role.replace('_', ' ')}`}
        </Typography>
        <Typography component="p" variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          You are registering as a {role.replace('_', ' ')}. Click below to continue.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleFormNavigation}
        >
          Continue to {role.replace('_', ' ')} Form
        </Button>
      </Box>
    </Container>
  );
}

export default RoleSpecificRegister;
