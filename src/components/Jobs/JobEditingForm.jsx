import React from 'react'
import { useState } from 'react';

const JobEditingForm = () => {
    const [jobTitle, setJobTitle] = useState('');
    const onJobTitleChange = (e) => setJobTitle(e.target.value);

    const [department, setDepartment] = useState('');
    const onDepartmentChange = (e) => setDepartment(e.target.value);

    const [jobDescription, setJobDescription] = useState('');
    const onJobDescriptionChange = (e) => setJobDescription(e.target.value);

    const [additionalInfo, setAdditionalInfo] = useState('');
    const onAdditionalInfoChange = (e) => setAdditionalInfo(e.target.value);

    const [status, setStatus] = useState('');
    const onStatusChange = (e) => setStatus(e.target.value);

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
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                    </select>
                </div>
                <button className="mt-3 btn btn-primary" style={{backgroundColor: 'rgb(18,28,78)', border: 'none'}}>Update</button>
                <button className="mt-3 mx-3 btn btn-secondary">Cancel</button>
            </div>
        </div>
    </ul>
  )
}

export default JobEditingForm