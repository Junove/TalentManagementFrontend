import React, { useEffect, useState } from 'react'
import JobEditingForm from '../../components/Jobs/JobEditingForm'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../components/Login/LoginContext';
import { getHiringManagerByUserId } from '../../handlers/HiringManagerAPIHandler';
import { getJobById } from '../../handlers/JobAPIHandler';

const EditJobPosting = () => {
  const { jobid } = useParams();
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);

  const [manager, setHiringManager] = useState({});
  const [job, setJob] = useState({});

  useEffect(() => {
    getHiringManagerByUserId(setHiringManager, user.id);
    getJobById(setJob, jobid);
  }, []);  


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
        
        <JobEditingForm jobId={jobid}/>
    </>
    )
    : (
    <div className='row'>
      <div className = "col-3">

      </div>  
      <div className = "col-6">
        <h1 className='mx-auto text-center mt-10'>You do not have edit access for this hob posting</h1>
      </div>  
    </div>
    )
    }
  </>
  )
}

export default EditJobPosting