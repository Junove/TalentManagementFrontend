import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, CardContent, Typography, CardActions, Button, Divider, Box } from '@mui/material';
import { getApplicationByID } from '../../handlers/JobApplicationAPIHandler';


const ViewSingleApplication = () => {
    const { applicationid } = useParams();

    const [application, setApplication] = useState([]);

    useEffect(()=>{
        getApplicationByID(setApplication, applicationid);
    }, []);

    useEffect(()=>{
        getApplicationByID(setApplication, applicationid);
    }, []);

    const jobApplication = {
        id: '12345',
        candidate_id: '67890',
        job_name: 'Software Engineer',
        date_applied: '2024-08-20',
        cover_letter: 'I am excited to apply for the Software Engineer position at Tech Corp. My experience with developing scalable applications aligns well with your needs.',
        custom_resume: 'Link to resume', // This could be a URL or file path in a real application
        application_status: 'Under Review'
      };

    useEffect(() => {

    }, [])



  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Job Application Details
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
          <strong>Job Name:</strong> {jobApplication.job_name}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Application ID:</strong> {application.id}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Candidate ID:</strong> {application.candidate_id}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Date Applied:</strong> {new Date(jobApplication.date_applied).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Cover Letter:</strong> {jobApplication.cover_letter}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Custom Resume:</strong> <a href={jobApplication.custom_resume} target="_blank" rel="noopener noreferrer">{jobApplication.custom_resume}</a>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Application Status:</strong> {jobApplication.application_status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary">Edit Application</Button>
      </CardActions>
    </Card>
  </Container>

  )
}

export default ViewSingleApplication