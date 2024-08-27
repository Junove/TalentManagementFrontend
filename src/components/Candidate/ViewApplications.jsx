import React, { useEffect, useState } from 'react'
import { Grid, Container } from '@mui/material';
import { getAllApplications } from '../../handlers/JobApplicationAPIHandler';
import IndividualApplicationGridItem from './IndividualApplicationGridItem';

const ViewApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);

    useEffect(()=>{
      getAllApplications(setJobApplications);
    }, []);

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={30} justifyContent="center">
        {jobApplications.map((jobApp) => (
          <IndividualApplicationGridItem jobApp={jobApp}/>
        ))}
      </Grid>
    </Container>
  )
}

export default ViewApplications