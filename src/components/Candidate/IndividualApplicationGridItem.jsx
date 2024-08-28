import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { getJobById } from '../../handlers/JobAPIHandler';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from "react-router-dom";



const IndividualApplicationGridItem = (props) => {
    const navigate = useNavigate();

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
                <Button size="small">Edit</Button>
                <Button size="small" onClick={handleDelete}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
  )
}

export default IndividualApplicationGridItem