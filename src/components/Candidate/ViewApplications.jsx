import React, { useEffect, useState } from 'react'
import { Grid, Container } from '@mui/material';
import { getApplicationByUserID } from '../../handlers/JobApplicationAPIHandler';
import { getCandidateByUserId } from '../../handlers/CandidateAPIHandler';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import IndividualApplicationGridItem from './IndividualApplicationGridItem';

const ViewApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

    useEffect(() => {
      getCandidateByUserId(setCandidates, user.id);
      getApplicationByUserID(setJobApplications,candidates.id);
    }, [user.id, candidates]);  

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        maxWidth: '100vw',
      }}
    >
      <Grid container spacing={2} justifyContent="center" sx={{ marginY: 1 }}>
        {jobApplications.map((jobApp) => (
          <IndividualApplicationGridItem jobApp={jobApp}/>
        ))}
      </Grid>
    </Container>
  )
}

export default ViewApplications