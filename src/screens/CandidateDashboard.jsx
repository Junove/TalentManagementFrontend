import React from 'react'
import ViewApplications from '../components/Candidate/ViewApplications';



const CandidateDashboard = () => {

  return (
    <div>
        <div className='row'>
            <div className = "col-3">

            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-center my-5'>Your Applications</h1>
            </div>  
        </div>
        <ViewApplications/>
    </div>
  )
}

export default CandidateDashboard