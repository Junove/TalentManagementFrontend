import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import './index.css';

const ManagerProfile = () => {

    const userId = JSON.parse(localStorage.getItem('user')).id;

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        department: '',
        phone: '',
        user: {
            id: userId,
        }
    });

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [managerId, setManagerId] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(userId);
                const response = await axios.get(`http://localhost:8080/managers/userId/${userId}`);
                setManagerId(response.data.id);
                setProfile({
                    name: response.data.name,
                    email: response.data.email,
                    department: response.data.department,
                    phone: response.data.phone,
                    user: JSON.parse(localStorage.getItem('user'))
                });
                setCredentials({
                    username: response.data.user.username,
                    password: response.data.user.password,
                });
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchProfile();
    }, [managerId]);

    
    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleCredentialsChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleProfileSubmit = async () => {
        try {
            console.log(profile);
            await axios.put(`http://localhost:8080/managers/${managerId}`, profile);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile');
        }
    };

    const handleCredentialsSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/users/${userId}`, credentials);
            alert('Credentials updated successfully');
        } catch (error) {
            console.error('Error updating credentials', error);
            alert('Failed to update credentials');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <Container maxWidth="md" style={{
            marginTop: '20px', // Adjust the value as needed
        }}>
            <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                    <Box component="form" noValidate autoComplete="off">
                        <Typography variant="h6" gutterBottom>Edit My Profile</Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="custom-textfield"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="custom-textfield"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Department"
                            name="department"
                            value={profile.department}
                            onChange={handleProfileChange}
                            className="custom-textfield"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="custom-textfield"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, backgroundColor:'rgb(237,28,46)' }}
                            onClick={handleProfileSubmit}
                        >
                            Save Profile
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component="form" noValidate autoComplete="off">
                        <Typography variant="h6" gutterBottom>Edit Credentials</Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            name="username"
                            value={credentials.username}
                            onChange={handleCredentialsChange}
                            className="custom-textfield"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={credentials.password}
                            onChange={handleCredentialsChange}
                            className="custom-textfield"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCredentialsSubmit}
                            sx={{ mt: 3, mb: 2, backgroundColor:'rgb(237,28,46)' }}
                        >
                            Save Credentials
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ManagerProfile;