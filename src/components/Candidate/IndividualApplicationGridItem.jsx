import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid, Paper, Box } from '@mui/material';
import { getJobById } from '../../handlers/JobAPIHandler';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from "react-router-dom";



const IndividualApplicationGridItem = (props) => {
    

    const {
        jobApp,
        userID,
        getApplicationByUserID,
        setJobApplications

        
    } = props
    const [job, setJob] = useState({});

    useEffect(()=>{
        getJobById(setJob, jobApp.job_id);
        

    }, [jobApp.job_id]);
   
  

    const handleDelete = async(e) => {
      try{
      const response = await fetch(`http://localhost:8080/jobapps/${jobApp.id}`,{
        method:'DELETE',
        

      });
      if(response.ok){
        //getApplicationByUserID(setJobApplications,userID);
        
        // if(onDelete){
        //   //onDelete(jobApp.id);
        //   console.log("ok")
        // } 
        await getApplicationByUserID(setJobApplications,userID);
        console.log("ok");
        //navigate("/jobapps");
        //return null;
      }

        else{
          console.error("Fail", response.statusText);
        }
        
      }
    catch(error){console.log("error delete")}
    }

  return (
    <Grid item xs={12} key={job.id}>
    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', marginX: 'auto', padding: 2, maxWidth: '60%' }}>
      <Box flexGrow={1}>
        {/* Wrap the job title in a Link component */}
        <Typography variant="subtitle1" fontWeight="bold"  sx={{ textDecoration: 'none', color: 'inherit' }}>
          {job.job_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.department} - Posted on {new Date(job.date_listed).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" sx={{ color: jobApp.application_status === 'Hired' ? 'green' : 'black' }}>
          { jobApp.application_status === 'Hired' ? <strong>Application Status: {jobApp.application_status}</strong> : `Application: ${jobApp.application_status}`}
        </Typography>
        <Typography variant="body2">
          Applied on: {new Date(jobApp.date_applied).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" sx={{ color: job.listing_status === 'Open' ? 'green' : 'red' }}>
          Job Listing Status: {job.listing_status}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, marginTop: 1, justifyContent: 'content' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Link to={`/application/${jobApp.id}`}>
            <Button size="small">View Details</Button>
          </Link>
          <Button size="small">Edit</Button>
          <Button size="small" onClick={handleDelete}>Delete</Button>
          </div>
        </Box>
      </Box>
    </Paper>
  </Grid>
  )
}

export default IndividualApplicationGridItem