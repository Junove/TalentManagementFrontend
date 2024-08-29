import React, { useEffect } from 'react'
import ViewApplications from '../components/Candidate/ViewApplications';
import { useContext, useState } from 'react';
import { LoginContext } from '../components/Login/LoginContext';
import { getCandidateByUserId } from '../handlers/CandidateAPIHandler';
import SugggestedJobs from '../components/Candidate/SugggestedJobs';


const CandidateDashboard = () => {

  const { isLoggedIn, user, logout } = useContext(LoginContext);

  const [candidate, setCandidate] = useState({});

  const [screenState, setScreenState] = useState('applications');

  useEffect(() => {
    getCandidateByUserId(setCandidate, user.id);
  }, [user]);
 
  return (
    <>
    { user.type === "candidate" ? (
    <div>
      <div className='row'>
            <div className = "col-3">
              {console.log(`${user.role}`)}
            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-center mt-5'>Hello {candidate.fullName}</h1>
            </div>  
        </div>

      <div className='row mt-5'>
            <div className = "col-3">
            </div>  
            <div className = "col-3">
              <div style={{display: 'grid', placeItems: 'center'}}>
                <button className={screenState === 'applications' ? 'btn btn-primary': 'btn btn-secondary'} onClick={() => setScreenState('applications')}>Applications</button>
              </div>
            </div>  
            <div className = "col-3">
              <div style={{display: 'grid', placeItems: 'center'}}>
                <button className={screenState === 'applications' ? 'btn btn-secondary': 'btn btn-primary'} onClick={() => setScreenState('suggested')}>Job Suggestions</button>
              </div>
            </div>
        </div>

        { screenState === 'applications' ? ( 
          <> 
            <ViewApplications/>
          </>
        ) : (
          <>  
            <div className='row'>
                <div className = "col-3">
                  {console.log(`${user.role}`)}
                </div>  
                <div className = "col-6">
                <h1 className='mx-auto text-center my-5'></h1>
                </div>  
            </div>
            <SugggestedJobs/>
          </>
        )}
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