import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { getJobById } from '../../handlers/JobAPIHandler';
import { Link } from 'react-router-dom';

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
      <Paper elevation={1} style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
        <Box flexGrow={1}>
          {/* Wrap the job title in a Link component */}
          <Typography variant="subtitle1" fontWeight="bold" component={Link} to={`/job/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {job.listing_title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {job.department} - Posted on {new Date(job.date_listed).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color={job.listing_status === 'Open' ? 'green' : 'red'}>
            Status: {job.listing_status}
          </Typography>
          <Typography variant="body2">
            Applied on: {new Date(jobApp.date_applied).toLocaleDateString()}
          </Typography>
          <Link to={`/application/${jobApp.id}`}><Button size="small">View Details</Button></Link>
          <Button size="small">Edit</Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default IndividualApplicationGridItem