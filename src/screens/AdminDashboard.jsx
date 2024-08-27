import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

const AdminDashboard = () => {
    return (
        // <div>
        //     <h1>Admin Dashboard</h1>
        //     <Link to="/admin/administrator">Administrator</Link>
        //     <Link to="/admin/candidates">Candidates</Link>
        //     <Link to="/admin/hiringManagers">Hiring Managers</Link>
        //     <Link to="/admin/jobApplications">Job Applications</Link>
        //     <Link to="/admin/jobListings">Job Listings</Link>
        //     <Link to="/admin/users">Users</Link>
        // </div>

        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh'}}>
            <Card>
                <CardContent>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Welcome to the Admin Dashboard page! 
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminDashboard;