import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { getJobById } from '../../handlers/JobAPIHandler';
import { Link } from 'react-router-dom';
import EditApplication from './EditApplication';

const IndividualApplicationGridItem = (props) => {
    const {
        jobApp
    } = props
    const [job, setJob] = useState({});

    useEffect(()=>{
        getJobById(setJob, jobApp.job_id);

    }, []);

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} key={jobApp.id}>
            <Card 
                sx={{
                    minWidth: 300, // Minimum width for each card
                    maxWidth: 400, // Maximum width for each card
                  }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.listing_title}
                </Typography>
                <Typography color="text.secondary">
                  {job.department}
                </Typography>
                <Typography variant="body2">
                  Applied on: {new Date(jobApp.date_applied).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
              <Link to={`/application/${jobApp.id}`}><Button size="small">View Details</Button></Link>
                    <Link to={`/application/${jobApp.id}/edit`}><Button size="small">Edit</Button></Link>
                </CardActions>
            </Card>
          </Grid>
  )
}
export default IndividualApplicationGridItem
