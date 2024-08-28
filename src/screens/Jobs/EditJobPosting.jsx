import React, { useEffect, useState } from 'react'
import JobEditingForm from '../../components/Jobs/JobEditingForm'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import { getAllHiringManagers, getHiringManagerByUserId } from '../../handlers/HiringManagerAPIHandler';
import { getJobById } from '../../handlers/JobAPIHandler';
import Snackbar from '@mui/material/Snackbar';

const EditJobPosting = () => {
  const { jobid } = useParams();
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

  const [manager, setHiringManager] = useState({});
  const [job, setJob] = useState({});

  useEffect(() => {
    console.log(`user id: ${user.id}`)
    getHiringManagerByUserId(setHiringManager,user.id);
    getJobById(setJob, jobid);
  }, []);  

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <>
    { (user.type === 'hiring_manager' && manager.id === job.manager_id) ? (
      <>
        <div className='row'>
            <div className = "col-3">

            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-start mt-3'>Edit Job Posting</h1>
            </div>  
        </div>
        
        <JobEditingForm jobId={jobid} snackBarOpenHandler={handleClick}/>
        
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Job Posting Edited"
        action={action}
      />
    </>
    )
    : (
    <div className='row'>
      <div className = "col-3">

      </div>  
      <div className = "col-6">
        <h1 className='mx-auto text-center mt-10'>You do not have edit access for this job posting</h1>
      </div>  
    </div>
    )
    }
  </>
  )
}

export default EditJobPosting