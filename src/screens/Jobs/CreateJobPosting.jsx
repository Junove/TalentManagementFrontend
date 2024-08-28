import React, { useState } from 'react'
import JobPostingForm from '../../components/Jobs/JobPostingForm'
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import Snackbar from '@mui/material/Snackbar';
import { Button } from '@mui/material';

const CreateJobPosting = () => {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button onClick={handleClose} color='inherit'>X</Button>
    </React.Fragment>
  );

  return (
    <>
        <div className='row'>
            <div className = "col-3">

            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-start mt-3'>New Job Posting</h1>
            </div>  
        </div>
        <JobPostingForm snackBarOpenHandler={handleClick}/>

        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Job Posting Created"
        action={action}
      />
    </>
  )
}

export default CreateJobPosting