import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, ButtonGroup } from '@mui/material';

const AdminDashboard = () => {
    return (
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh'}}>
            <Card>
                <CardContent>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Welcome to the Admin Dashboard page! From this page, you can manage the following all of the data contained within this application. This includes but is not limited to the creation, deletion and updating of job postings, job applications, users, hiring managers, and administrators.
                    </p>

                    <ButtonGroup variant="contained" aria-label="Admin Navigation Buttons">
                        <Button href="/admin/administrator">Administrator</Button>
                        <Button href="/admin/candidates">Candidates</Button>
                        <Button href="/admin/hiringManagers">Hiring Managers</Button>
                        <Button href="/admin/jobApplications">Job Applications</Button>
                        <Button href="/admin/jobListings">Job Listings</Button>
                        <Button href="/admin/users">Users</Button>
                    </ButtonGroup>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminDashboard;