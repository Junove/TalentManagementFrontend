import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, MenuItem, Container, Box } from '@mui/material';
import axios from 'axios';
import './index.css';

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !role) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // API call to register the user
      const response = await axios.post('http://localhost:8080/users', {
        username,
        password,
        type: role
      });

      if (response.status === 201) {
        const userId = response.data.id;  
        
        switch (role) {
          case 'candidate':
            navigate('/candidate/register', { state: { userId } }); 
            break;
          case 'hiring_manager':
            navigate('/manager/register', { state: { userId } }); 
            break;
          default:
            navigate('/'); // Fallback to home
        }
      } else {
        setError('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while registering');
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            className='custom-textfield'
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className='custom-textfield'
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className='custom-textfield'
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="candidate">Candidate</MenuItem>
            <MenuItem value="hiring_manager">Hiring Manager</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:'rgb(237,28,46)' }}
          >
            Register
          </Button>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default UserRegister;
