import React from 'react'
import ViewApplications from '../components/Candidate/ViewApplications';
import { useContext } from 'react';
import { LoginContext } from '../components/Login/LoginContext';


const CandidateDashboard = () => {

  const { isLoggedIn, user, logout } = useContext(LoginContext);

 
  return (
    <>
    { user.type === "candidate" ? (
    <div>
        <div className='row'>
            <div className = "col-3">
              {console.log(`${user.role}`)}
            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-center my-5'>Your Applications</h1>
            </div>  
        </div>
        <ViewApplications/>
    </div>
  ) : (
    <div>
      not a candidate broski
      {console.log(`${user.role}`)}
    </div>
  )
}
</>
  )
  
  
}

export default CandidateDashboard