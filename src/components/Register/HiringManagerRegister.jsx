import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import './index.css';

function HiringManagerRegister() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
        } else {
            setError('User ID not found. Please register again.');
            navigate('/register');
        }
    }, [location.state, navigate]);

    const registerHiringManager = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('User ID is required to register as a HiringManager.');
            return;
        }
        const formData = {
            user: {
                id: userId, // Assuming `userId` is the ID of the user
            },
            name: fullName,
            email: email,
            department: department,
            phone: phone,
        };

        try {
            await axios.post('http://localhost:8080/managers', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Candidate registered successfully!');
        } catch (error) {
            setError('Failed to register candidate');
            console.error(error);
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
                    Hiring Manager Registration
                </Typography>
                <Box component="form" onSubmit={registerHiringManager} sx={{ mt: 3 }}>
                    <TextField
                        className='custom-textfield'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        className='custom-textfield'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className='custom-textfield'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="department"
                        label="Department"
                        name="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <TextField
                        className='custom-textfield'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
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

export default HiringManagerRegister
