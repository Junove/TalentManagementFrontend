import React, { useEffect } from 'react'
import { getAllJobs, getJobAndAddToList } from '../../handlers/JobAPIHandler';
import { useState, useContext } from 'react';
import { LoginContext } from '../Login/LoginContext';
import { getCandidateByUserId } from '../../handlers/CandidateAPIHandler';
import { getApplicationByUserID } from '../../handlers/JobApplicationAPIHandler';
import JobPosting from '../Jobs/JobPosting';

const SugggestedJobs = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const [jobsAppliedTo, setJobsAppliedTo] = useState([]);
    const [candidate, setCandidate] = useState({});
    const [departmentList, setDepartmentList] = useState(new Set());
    const [allJobs, setAllJobs] = useState([]);
    const { user } = useContext(LoginContext);

    useEffect(() => {
      getCandidateByUserId(setCandidate, user.id);
      getAllJobs(setAllJobs);
    }, [user]);  

    useEffect(() => {
      getApplicationByUserID(setJobApplications,candidate.id);
    }, [candidate]); 

    useEffect(() => {
        jobApplications.forEach(app => {
            getJobAndAddToList(setJobsAppliedTo, app.job_id)
        });
    }, [jobApplications]);

    useEffect(() => {
        setDepartmentList(new Set(jobsAppliedTo.map((job) => job.department)));
    }, [jobsAppliedTo]);

    

  return (
    <div className = "row ps-5 pe-5"  >      
        <div className = "col-12">
            <ul className="list-group">
            {allJobs.filter((job) => departmentList.has(job.department)).map(job => <JobPosting
                key={job.id}
                job={job}/>)}
            </ul>
        </div>
    </div>
  )
}

export default SugggestedJobs