import React from 'react'
import JobEditingForm from '../../components/Jobs/JobEditingForm'
import { useParams } from 'react-router-dom';

const EditJobPosting = () => {
  const { jobid } = useParams();

  return (
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
}

export default EditJobPosting