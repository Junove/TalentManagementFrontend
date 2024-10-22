import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 
import adplogo from './adplogo.png';
import { LoginContext } from '../Login/LoginContext';
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {
    const { user, isLoggedIn, logout } = useContext(LoginContext);
    const navigate = useNavigate();

    const dashboardUrl = () => {
        if (user.type === 'hiring_manager') {
            return `/managerdashboard/${user.id}`;
        } else if (user.type === 'candidate') {
            return `/candidatedashboard/${user.id}`;
        }
        return '/'; // Default or fallback route
    };

    const searchButton = () => {
        if (user.type === 'hiring_manager') {
            return false;
        } else if (user.type === 'candidate') {
            return true;
        }
        else if (!isLoggedIn) {
            return true;
        }
    };
    
    
    

    const handleLogout = () => {
        logout(); // Perform logout
        navigate('/'); // Redirect to home page
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link to={dashboardUrl()}>
                    <img src={adplogo} alt="Logo" width="80px" height="40px" />
                </Link>
                <Link to="/" className="navbar-brand">
                    <strong className="ps-3">Talent Management</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                          {searchButton() && <Link to="/search" className="nav-link">
                                Search
                            </Link>}
                        
                        </li>
                        {isLoggedIn ? (
                            <div className="d-flex ms-auto align-items-right">
                                <li className="nav-item me-2">
                                    <span className="nav-link" onClick={handleLogout}>
                                        Logout
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={handleProfileClick}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </li>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
