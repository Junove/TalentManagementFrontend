import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid, Container } from '@mui/material';
import { getAllApplications } from '../../handlers/JobApplicationAPIHandler';

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
        {jobApplications.map((job) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={job.id}>
            <Card 
                sx={{
                    minWidth: 300, // Minimum width for each card
                    maxWidth: 400, // Maximum width for each card
                  }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography color="text.secondary">
                  {job.company}
                </Typography>
                <Typography variant="body2">
                  Applied on: {new Date(job.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ViewApplications