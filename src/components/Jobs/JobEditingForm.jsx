import React from 'react'
import { useState, useEffect } from 'react';
import { getJobById, put } from '../../handlers/JobAPIHandler';
import { useNavigate } from 'react-router-dom';

const JobEditingForm = (props) => {
    const navigate = useNavigate();

    const {
        jobId,
        snackBarOpenHandler
    } = props

    const [job, setJob] = useState({});

    useEffect(()=>{
        console.log(jobId);
        getJobById(setJob, jobId);
        
    }, []);

    useEffect(() => {
        con
        setJobTitle(job.job_title);
        setDepartment(job.department);
        setJobDescription(job.job_description);
        setAdditionalInfo(job.additionl_info);
        setStatus(job.listing_status);
    }, [job])

    const [jobTitle, setJobTitle] = useState('');
    const onJobTitleChange = (e) => setJobTitle(e.target.value);

    const [department, setDepartment] = useState('');
    const onDepartmentChange = (e) => setDepartment(e.target.value);

    const [jobDescription, setJobDescription] = useState('');
    const onJobDescriptionChange = (e) => setJobDescription(e.target.value);

    const [additionalInfo, setAdditionalInfo] = useState('');
    const onAdditionalInfoChange = (e) => setAdditionalInfo(e.target.value);

    const [status, setStatus] = useState('');

    const [date, setDate] = useState('');
    const onStatusChange = (e) => {
        setStatus(e.target.value);
        if (e.target.value === 'closed'){
            
            const date = new Date(Date.now()).toISOString();
            const dateArray = date.split('T');
            const time = dateArray[1].substring(0,8)
            console.log(`${dateArray[0]} ${time}`);
            setDate(`${dateArray[0]} ${time}`)
        } else {
            console.log(null);
            setDate(null);
        }
    };

    const handlePutClick = () => {
        const updatedJob = {
            ...job,
            listing_title: jobTitle,
            department: department,
            job_description: jobDescription,
            additionl_info: additionalInfo,
            listing_status: status,
            date_closed: date
        }

        put(updatedJob, snackBarOpenHandler, jobId);
    }



  return (
    <ul className="list-group">
        <div className='row'>
        <div className = "col-3">

        </div>  
            <div className='col-6'>
                <div className="mt-3">
                    <label htmlFor="inputJobTitle">Job Title</label>
                    <input type="text" className="form-control" id="inputJobTitle" aria-describedby="emailHelp" placeholder="Enter job title"
                        value={jobTitle} onChange={onJobTitleChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputDepartment">Department</label>
                    <input type="text" className="form-control" id="inputDepartment" aria-describedby="emailHelp" placeholder="Enter department"
                        value={department} onChange={onDepartmentChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputJobDescription">Job Description</label>
                    <textarea className="form-control" id="inputJobDescription" aria-describedby="emailHelp" placeholder="Enter job description"
                        value={jobDescription} onChange={onJobDescriptionChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputAdditionalInfo">Additional Information</label>
                    <textarea className="form-control" id="inputAdditionalInfo" aria-describedby="emailHelp" placeholder="Enter additional information"
                        value={additionalInfo} onChange={onAdditionalInfoChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputListingStatus">Status</label>
                    <select className="form-select" id="inputListingStatus" aria-describedby="emailHelp" placeholder="Enter additional information"
                        value={status} onChange={onStatusChange}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                    </select>
                </div>
                <button className="mt-3 btn btn-primary" onClick={handlePutClick} style={{backgroundColor: 'rgb(18,28,78)', border: 'none'}}>Update</button>
                <button className="mt-3 mx-3 btn btn-secondary" onClick={()=> navigate('/')}>Cancel</button>
            </div>
        </div>
    </ul>
  )
}

export default JobEditingForm