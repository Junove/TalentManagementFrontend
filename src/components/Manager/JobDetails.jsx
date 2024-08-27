import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';

function JobDetails() {
  const { jid } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get(`http://localhost:8080/jobs/${jid}`);
        setJob(jobResponse.data);

        const applicationsResponse = await axios.get(`http://localhost:8080/applications/job/${jid}`);
        setApplications(applicationsResponse.data);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };

    fetchJobDetails();
  }, [jid]);

  const handleUpdateStatus = (applicationId, newStatus) => {
    axios.put(`http://localhost:8080/applications/${applicationId}`, { application_status: newStatus })
      .then(() => {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, application_status: newStatus } : app
          )
        );
      })
      .catch((error) => {
        console.error('Failed to update application status:', error);
      });
  };

  if (!job) return <Typography>Loading...</Typography>;

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          {job.listing_title}
        </Typography>
        <Typography variant="body1">{job.job_description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Department: {job.department}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {job.listing_status}
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Applications</Typography>
          {applications.map((app) => (
            <Card key={app.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="body1">{app.candidate.fullName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {app.application_status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleUpdateStatus(app.id, 'approved')}>
                  Approve
                </Button>
                <Button onClick={() => handleUpdateStatus(app.id, 'rejected')}>
                  Reject
                </Button>
                <Button href={`http://localhost:8080/files/${app.candidate.resume}`} target="_blank">
                  View Resume
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default JobDetails;
