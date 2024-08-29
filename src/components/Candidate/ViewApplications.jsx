import React, { useEffect, useState } from 'react'
import { Grid, Container } from '@mui/material';
import { getApplicationByUserID } from '../../handlers/JobApplicationAPIHandler';
import { getCandidateByUserId } from '../../handlers/CandidateAPIHandler';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import IndividualApplicationGridItem from './IndividualApplicationGridItem';
import EditApplication from './EditApplication';
import CandidateDashboardChart from './CandidateDashboardChart';

const ViewApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const [candidate, setCandidate] = useState({});
    const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

    useEffect(() => {
      getCandidateByUserId(setCandidate, user.id);
    }, [user]);  

    useEffect(() => {
      getApplicationByUserID(setJobApplications,candidate.id);
    }, [candidate]);  

  return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        maxWidth: '100vw',
      }}
    >
      <CandidateDashboardChart applications={jobApplications}/>

      <Grid container spacing={2} justifyContent="center" sx={{ marginY: 1 }}>
        {jobApplications.map((jobApp) => (
          <IndividualApplicationGridItem key={jobApp.id} jobApp={jobApp} userID={user.id} getApplicationByUserID={getApplicationByUserID} setJobApplications={setJobApplications}/>
        ))}
      </Grid>
     
      </Container>
    );
   
}

export default ViewApplications
