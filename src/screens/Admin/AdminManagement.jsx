import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

const AdminManagement = () => {
    return (
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh'}}>
            <Card>
                <CardContent>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Welcome to the Admin Dashboard page! From this page, you can manage the following all of the data contained within this application. This includes but is not limited to the creation, deletion and updating of job postings, job applications, users, hiring managers, and administrators.
                    </p>

                    <Stack direction="row" spacing={2}>
                        <Link to="/admin/administrator">Administrator</Link>
                        <Link to="/admin/candidates">Candidates</Link>
                        <Link to="/admin/hiringManagers">Hiring Managers</Link>
                        <Link to="/admin/jobApplications">Job Applications</Link>
                        <Link to="/admin/jobListings">Job Listings</Link>
                        <Link to="/admin/users">Users</Link>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminManagement;