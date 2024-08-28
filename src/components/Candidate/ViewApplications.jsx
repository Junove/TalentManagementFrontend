import React, { useEffect, useState } from 'react'
import { Grid, Container } from '@mui/material';
import { getApplicationByUserID } from '../../handlers/JobApplicationAPIHandler';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import IndividualApplicationGridItem from './IndividualApplicationGridItem';

const ViewApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

    useEffect(() => {
      console.log(`user id: ${user.id}`)
      getApplicationByUserID(setJobApplications,user.id);
    }, []);  

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
          <IndividualApplicationGridItem jobApp={jobApp} userID={user.id} getApplicationByUserID={getApplicationByUserID} setJobApplications={setJobApplications}/>
        ))}
      </Grid>
    </Container>
  )
}

export default ViewApplications