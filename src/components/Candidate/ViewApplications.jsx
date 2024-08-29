import React, { useEffect, useState } from 'react'
import { Grid, Container } from '@mui/material';
import { getApplicationByUserID } from '../../handlers/JobApplicationAPIHandler';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import IndividualApplicationGridItem from './IndividualApplicationGridItem';
import EditApplication from './EditApplication';

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
    );
   
}

export default ViewApplications
