import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import './index.css';

const CandidateProfile = () => {

    const userId = JSON.parse(localStorage.getItem('user')).id;

    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        user: {
            id: userId, // Assuming `userId` is the ID of the user
        },// Add user object here
    });

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [candidateId, setCandidateId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/candidates/userId/${userId}`);
                setCandidateId(response.data.id);
                setProfile({
                    fullName: response.data.fullName,
                    email: response.data.email,
                    address: response.data.address,
                    phone: response.data.phone,
                    user: JSON.parse(localStorage.getItem('user')) // Set user object from local storage
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
    }, [candidateId]);

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleCredentialsChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleProfileSubmit = async () => {
        try {
            console.log(profile);
            await axios.put(`http://localhost:8080/candidates/${candidateId}`, profile);
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
                            name="fullName"
                            value={profile.fullName}
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
                            label="Address"
                            name="address"
                            value={profile.address}
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
                            sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(237,28,46)' }}
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
                            sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(237,28,46)' }}
                        >
                            Save Credentials
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CandidateProfile;
