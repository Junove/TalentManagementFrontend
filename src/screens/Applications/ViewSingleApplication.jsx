import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, CardContent, Typography, CardActions, Button, Divider, Box } from '@mui/material';
import { getApplicationByID } from '../../handlers/JobApplicationAPIHandler';
import { getJobById } from '../../handlers/JobAPIHandler';
import { getCandidateById } from '../../handlers/CandidateAPIHandler';
import { useNavigate, Link } from 'react-router-dom';


const ViewSingleApplication = () => {
    const navigate = useNavigate();

    const { applicationid } = useParams();

    const [application, setApplication] = useState([]);

    useEffect(()=>{
        getApplicationByID(setApplication, applicationid);
    }, []);
    
    const [job, setJob] = useState({});
    const [candidate, setCandidate] = useState({});

    useEffect(()=>{
        getJobById(setJob, application.job_id);
        getCandidateById(setCandidate, application.candidate_id);
    }, [application]);



  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <button className='btn btn-dark override-blue' style={{marginRight: '48.5rem', marginBottom: '4rem'}} onClick={() => navigate('/')}> {'< Back'}</button>

    <Card sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Job Application Details
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
          <strong>Job Name:</strong> {job.listing_title}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Application ID:</strong> {application.id}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Candidate Name:</strong> {candidate.fullName}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Date Applied:</strong> {new Date(application.date_applied).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Cover Letter: </strong>
          <a href={application.cover_letter} target="_blank" rel="noopener noreferrer">
            {application.cover_letter}
          </a>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Custom Resume: </strong>
          <a href={application.custom_resume} target="_blank" rel="noopener noreferrer">
            {application.custom_resume}
          </a>
          </Typography>
        <Typography variant="body1" paragraph>
          <strong>Application Status:</strong> {application.application_status}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/application/${application.id}/edit`}><Button variant="outlined" color="primary">Edit Application</Button></Link>
      </CardActions>
    </Card>
  </Container>

  )
}

export default ViewSingleApplication