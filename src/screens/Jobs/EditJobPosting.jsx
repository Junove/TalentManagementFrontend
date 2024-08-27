import React from 'react'
import JobEditingForm from '../../components/Jobs/JobEditingForm'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';

const EditJobPosting = () => {
  const { jobid } = useParams();
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

  

  return (
    <>
    { user.type === 'hiring_manager' ? (
      <>
        <div className='row'>
            <div className = "col-3">

            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-start mt-3'>Edit Job Posting</h1>
            </div>  
        </div>
        
        <JobEditingForm jobId={jobid}/>
    </>
    )
    : (
    <div className='row'>
      <div className = "col-3">

      </div>  
      <div className = "col-6">
        <h1 className='mx-auto text-start mt-3'>You are not a manager</h1>
      </div>  
    </div>
    )
    }
  </>
  )
}

export default EditJobPosting