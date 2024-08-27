import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const JobApplication = () => {
    //const location = useLocation();
    //const navigate = useNavigate();
    const { jid } = useParams(); 
    const [job, setJob] = useState(null);
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('');

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                console.log(`${jid}`);
                const response = await axios.get(`http://localhost:8080/jobs/${jid}`);
                setJob(response.data);
                console.log("Job Listings (JSON):", JSON.stringify(response.data, null, 2));
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('status', 'Under Review');
        formData.append('candidate_id', 0);
        formData.append('resume', resume);
        formData.append('cover_letter', coverLetter);
        //setStatus to "Under Review"

        try {
            const response = await fetch('https://localhost:8080/jobapps', {
                method: 'POST',
                body: formData,
                
                //send candidate_id, job_id, date_applied, cover_letter, custom_resume, application_status
            });
            console.log(response.data);
            if (response.ok) {
                setSubmissionStatus('Application submitted successfully!');
            } else {
                setSubmissionStatus('Error submitting application, .');
            }
        } catch (error) {
            setSubmissionStatus('Error submitting application.');
        }
    };

    if (!job) return <div>Loading...</div>;

    return (
        <>
        <div className='row'>
            <div className = "col-3">

            </div>  
            <div className = "col-6">
            <h1 className='mx-auto text-start mt-3'>Application for {job.job_title}</h1>
            </div>  
        </div>
        <ul className="list-group">
        <div className='row'>
        <div className = "col-3">
        </div>  
            <div className='col-6'>
                <div className="mt-3">
                    <p htmlFor="inputJobDescription">{job.job_description}</p>
                </div>
                <div className="mt-3">
                    
                    <label htmlFor="resume" >Upload Resume: </label>
                    <input
                        type="file"
                        id="resume"
                        onChange={(e) => {
                            setResume(e.target.files[0]); console.log(e.target.files)
                        }}
                        required
                    />
                </div> 
                <div className="mt-3">
                    <label htmlFor="cover_letter">Upload Cover Letter: </label>
                    <input
                        type="file"
                        id="cover_letter"
                        onChange={(e) => setCoverLetter(e.target.files[0])}
                        required
                    />
                </div>
                
                <div className="mt-3">
                    <label htmlFor="inputAdditionalInfo">Additional Information</label>
                    <textarea className="form-control" id="inputAdditionalInfo" aria-describedby="emailHelp" placeholder="Enter additional information"
                        // value={additionalInfo} onChange={onAdditionalInfoChange}
                        />
                </div>
                <button className="mt-3 btn btn-primary" onClick={handleSubmit} style={{backgroundColor: 'rgb(18,28,78)', border: 'none'} }>Create</button>
                <button className="mt-3 mx-3 btn btn-secondary">Cancel</button>
            </div>
        </div>
    </ul>
    {submissionStatus && <p>{submissionStatus}</p>}
    </>
    );
};

export default JobApplication;
