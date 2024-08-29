import React from 'react';
import { useState, useEffect , useContext} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { postApp } from '../../handlers/JobAPIHandler'
import axios from 'axios';
import { getCandidateByUserId } from '../../handlers/CandidateAPIHandler';
import { LoginContext } from "../../components/Login/LoginContext";

const JobApplication = () => {
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(LoginContext);
    const { jid } = useParams(); 
    const [job, setJob] = useState(null);
    const [candId, setCandId] = useState(null);
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('');

    useEffect(() => {

        if(redirect){
            navigate("/candidateDashboard")
        }

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
        getCandidateByUserId(setCandId, user.id);
    }, [redirect, jid]);

    // const [jobTitle, setJobTitle] = useState('');
    // const onJobTitleChange = (e) => setJobTitle(e.target.value);
    // const handleFileUpload = async (file, type) => {

    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('type', type);

    //     try {
    //         const response = await axios.post('http://localhost:8080/jobapps', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });
    //         return response.data.path; // Assumes backend returns the file path
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //         return null;
    //     }
    // };

    const formSubmissionHandler = async () => {

        const formData = new FormData();
        formData.append('cover_letter', coverLetter);
        formData.append('custom_resume', resume);
        formData.append('application_status', "Under Review");
        formData.append('candidate_id', candId.id);
        formData.append('job_id', jid);

        // Log FormData contents
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post('http://localhost:8080/jobapps', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("Application submitted successfully:", response.data);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error("Error submitting application:", error);
            alert('Error submitting application.');
        }

        setRedirect(true);
    }


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
                            setResume(e.target.files[0])
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
                        // value={additionalInfo} onChange={setAdditionalInfo}
                        />
                </div>
                <button className="mt-3 btn btn-primary" onClick={formSubmissionHandler} style={{backgroundColor: 'rgb(18,28,78)', border: 'none'} }>Create</button>
                <button className="mt-3 mx-3 btn btn-secondary">Cancel</button>
            </div>
        </div>
    </ul>
    {submissionStatus && <p>{submissionStatus}</p>}
    </>
    );
};

export default JobApplication;
