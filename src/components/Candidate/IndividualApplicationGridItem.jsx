import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid, Paper, Box } from '@mui/material';
import { getJobById } from '../../handlers/JobAPIHandler';

const IndividualApplicationGridItem = (props) => {
    const {
        jobApp
    } = props
    const [job, setJob] = useState({});

    useEffect(()=>{
        getJobById(setJob, jobApp.job_id);

    }, []);

  return (
    <Grid item xs={12} key={job.id}>
    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', marginX: 'auto', padding: 2, maxWidth: '60%' }}>
      <Box flexGrow={1}>
        {/* Wrap the job title in a Link component */}
        <Typography variant="subtitle1" fontWeight="bold" component={Link} to={`/jobpost/${job.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
          {job.listing_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.department} - Posted on {new Date(job.date_listed).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" sx={{ color: job.listing_status === 'Open' ? 'green' : 'red' }}>
          Status: {job.listing_status}
        </Typography>
        <Typography variant="body2">
          Applied on: {new Date(jobApp.date_applied).toLocaleDateString()}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
          <Link to={`/application/${jobApp.id}`}>
            <Button size="small">View Details</Button>
          </Link>
          <Button size="small">Edit</Button>
        </Box>
      </Box>
    </Paper>
  </Grid>
  )
}

export default IndividualApplicationGridItem