import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const JobApplication = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //const [job, setJob] = useState(null);
    const job = {"job_title": "Software Engineer"};
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('');

    // useEffect(() => {
    //     if (location.state && location.state.job) {
    //         setJob(location.state.job);
    //     } else {
    //         // Handle missing job data
    //         navigate('/jobpost'); // Redirect or show error
    //     }
    // }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('cover_letter', coverLetter);
        //setStatus to "Under Review"

        try {
            const response = await fetch('https://localhost:8080/applications', {
                method: 'POST',
                body: formData,
                //send candidate_id, job_id, date_applied, cover_letter, custom_resume, application_status
            });

            if (response.ok) {
                setSubmissionStatus('Application submitted successfully!');
            } else {
                setSubmissionStatus('Error submitting application, .');
            }
        } catch (error) {
            setSubmissionStatus('Error submitting application.');
        }
    };

    //if (!job) return <div>Loading...</div>;

    return (
        <div className="application-container">
            <h2>Apply for {job.job_title}</h2>
            <div>
                <h3>Job Details</h3>
                <p>Date Listed: {new Date(job.date_listed).toLocaleDateString()}</p>
                <p>Job Description: {job.job_description}</p>
                <p>Listing Status: {job.listing_status}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="applicantName">Name</label>
                    <input
                        type="text"
                        id="applicantName"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="applicantEmail">Email</label>
                    <input
                        type="email"
                        id="applicantEmail"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <input
                        type="file"
                        id="resume"
                        onChange={(e) => setResume(e.target.files[0])}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cover_letter">Cover Letter</label>
                    <input
                        type="file"
                        id="cover_letter"
                        onChange={(e) => setCoverLetter(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Submit Application</button>
            </form>
            {submissionStatus && <p>{submissionStatus}</p>}
        </div>
    );
};

export default JobApplication;
