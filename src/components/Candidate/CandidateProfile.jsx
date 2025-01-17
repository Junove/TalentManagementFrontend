import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Card, CardContent, Box, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
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
            id: userId,
        },
    });

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [candidateId, setCandidateId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [showProfileForm, setShowProfileForm] = useState(false);
    const [showCredentialsForm, setShowCredentialsForm] = useState(false);

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

    const handleEditProfileClick = () => {
        setShowProfileForm(true);
        setShowCredentialsForm(false);
    };
    
    const handleEditCredentialsClick = () => {
        setShowCredentialsForm(true);
        setShowProfileForm(false);
    };

    const handleProfileSubmit = async () => {
        try {
            console.log(profile);
            await axios.put(`http://localhost:8080/candidates/${candidateId}`, profile);
            alert('Profile updated successfully');
            setShowProfileForm(false);
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile');
        }
    };

    const handleCredentialsSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/users/${userId}`, credentials);
            alert('Credentials updated successfully');
            setShowCredentialsForm(false);
        } catch (error) {
            console.error('Error updating credentials', error);
            alert('Failed to update credentials');
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Grid container spacing={10}>
            {/* Profile Card */}
            <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>My Profile</Typography>
                <Card elevation={3} sx={{ borderRadius: '12px', padding: '20px', border: '1px solid rgb(18,28,78)', mt: 2 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ color: 'rgb(18,28,78)', display: 'flex', alignItems: 'center' }}>
                                    Name: 
                                    <Typography variant="body1" sx={{ fontWeight: '500', ml: 1 }}>{profile.fullName}</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ color: 'rgb(18,28,78)', display: 'flex', alignItems: 'center' }}>
                                    Email: 
                                    <Typography variant="body1" sx={{ fontWeight: '500', ml: 1 }}>{profile.email}</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ color: 'rgb(18,28,78)', display: 'flex', alignItems: 'center' }}>
                                    Address: 
                                    <Typography variant="body1" sx={{ fontWeight: '500', ml: 1 }}>{profile.address}</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ color: 'rgb(18,28,78)', display: 'flex', alignItems: 'center' }}>
                                    Phone: 
                                    <Typography variant="body1" sx={{ fontWeight: '500', ml: 1 }}>{profile.phone}</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'rgb(237,28,46)',
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                                '&:hover': {
                                                    color: '#d92639',
                                                },
                                            }}
                                            onClick={handleEditProfileClick}
                                        >
                                            Edit My Profile
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'rgb(237,28,46)',
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                                '&:hover': {
                                                    color: '#d92639',
                                                },
                                            }}
                                            onClick={handleEditCredentialsClick}
                                        >
                                            Edit Credentials
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            {/* Profile and Credentials Forms */}
            <Grid item xs={12} md={6}>
                {showProfileForm && (
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
                                onClick={handleProfileSubmit}
                                sx={{ mt: 3, mb: 2, backgroundColor: 'rgb(237,28,46)' }}
                            >
                                Save Profile
                            </Button>
                        </Box>
                )}

                {showCredentialsForm && (
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
                )}
            </Grid>
        </Grid>
    </Container>
    );
};

export default CandidateProfile;
