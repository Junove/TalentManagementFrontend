import React from 'react'
import JobPostingForm from '../../components/Jobs/JobPostingForm'

const CreateJobPosting = () => {


  return (
    <>
        <div className='row'>
            <div className = "col-3">

            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-start mt-3'>New Job Posting</h1>
            </div>  
        </div>
        <JobPostingForm/>
    </>
  )
}

export default CreateJobPosting