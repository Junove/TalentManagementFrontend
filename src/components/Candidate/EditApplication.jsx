// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography, CardActions, Button, Grid, TextField, Divider } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import baseURL from '../../constants/baseURL'; 

// const EditApplication = () => {
//     const { jobAppId } = useParams();
//     const [application, setApplication] = useState({});
//     const [resumeFile, setResumeFile] = useState(null);
//     const [coverLetterFile, setCoverLetterFile] = useState(null);
//     const [submissionStatus, setSubmissionStatus] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchApplicationDetails = async () => {
//             try {
//                 const response = await axios.get(`${baseURL}/jobapps/${jobAppId}`);
//                 setApplication(response.data);
//             } catch (error) {
//                 console.error("Error fetching application details:", error);
//             }
//         };

//         fetchApplicationDetails();
//     }, [jobAppId]);

//     const handleFileChange = (e) => {
//         if (e.target.name === 'resume') setResumeFile(e.target.files[0]);
//         if (e.target.name === 'coverLetter') setCoverLetterFile(e.target.files[0]);
//     };

//     const handleSave = async () => {
//         const formData = new FormData();
    
//         if (resumeFile) formData.append('custom_resume', resumeFile);
//         if (coverLetterFile) formData.append('cover_letter', coverLetterFile);
//         formData.append('application_status', 'Under Review');
//         formData.append('candidate_id', application.candidate_id || '');
//         formData.append('job_id', application.job_id || '');
    
//         // Log FormData content for debugging
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}: ${value}`);
//         }
    
//         try {
//             const response = await axios.put(`${baseURL}/jobapps/${jobAppId}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
    
//             if (response.status === 200) {
//                 setSubmissionStatus('Application updated successfully!');
//                 navigate(`/application/${jobAppId}`);
//             } else {
//                 setSubmissionStatus(`Error updating application: ${response.statusText}`);
//             }
//         } catch (error) {
//             console.error('Error updating application:', error.response || error);
//             setSubmissionStatus(`Error updating application: ${error.response?.data?.message || error.message}`);
//         }
//     };

//     const handleCancel = () => {
//         navigate(`/application/${jobAppId}`);
//     };

//     if (!application.job_id) return <div>Loading...</div>;

//     return (
//         <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }}>
//             <Grid item xs={12} sm={10} md={8} lg={6}>
//                 <Card sx={{ p: 3 }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ mb: 2 }}>
//                             Edit Application
//                         </Typography>
//                         <Divider sx={{ mb: 2 }} />
//                         <Typography variant="body1" sx={{ mb: 1 }}>
//                             <strong>Application ID:</strong> {jobAppId}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mb: 1 }}>
//                             <strong>Candidate ID:</strong> {application.candidate_id}
//                         </Typography>
//                         <Typography variant="body1" sx={{ mb: 1 }}>
//                             <strong>Date Applied:</strong> {new Date(application.date_applied).toLocaleDateString()}
//                         </Typography>
//                         <Divider sx={{ my: 2 }} />
//                         <Typography variant="body1" sx={{ mb: 1 }}>
//                             <strong>Cover Letter:</strong>
//                         </Typography>
//                         <TextField
//                             type="file"
//                             name="coverLetter"
//                             onChange={handleFileChange}
//                             variant="outlined"
//                             fullWidth
//                             margin="normal"
//                         />
//                         <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
//                             <strong>Custom Resume:</strong>
//                         </Typography>
//                         <TextField
//                             type="file"
//                             name="resume"
//                             onChange={handleFileChange}
//                             variant="outlined"
//                             fullWidth
//                             margin="normal"
//                         />
//                     </CardContent>
//                     <CardActions sx={{ justifyContent: 'flex-end' }}>
//                         <Button size="small" variant="contained" color="primary" onClick={handleSave}>Save</Button>
//                         <Button size="small" variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>Cancel</Button>
//                     </CardActions>
//                     {submissionStatus && <Typography variant="body2" sx={{ mt: 2 }}>{submissionStatus}</Typography>}
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// };

// export default EditApplication;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button, Grid, TextField, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import baseURL from '../../constants/baseURL';

const EditApplication = () => {
    const { jobAppId} = useParams();
    const [application, setApplication] = useState({});
    const [resumeFile, setResumeFile] = useState(null);
    const [coverLetterFile, setCoverLetterFile] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await axios.get(`${baseURL}/jobapps/${jobAppId}`);
                setApplication(response.data);
            } catch (error) {
                console.error("Error fetching application details:", error);
            }
        };

        const fetchPreviousData = async () => {
            try {
                const response = await axios.get(`${baseURL}/jobapps/candidatespec/2`);
                const data = JSON.stringify(response.data);
                
                setResumeFile(response.data[0].custom_resume);
                setCoverLetterFile(response.data[0].cover_letter);
            } catch (error) {
                console.error("Error fetching application details:", error);
            }
        };

        fetchApplicationDetails();
        fetchPreviousData();
    }, [jobAppId]);

    
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        if (e.target.name === 'resume') setResumeFile(e.target.files[0]);
        if (e.target.name === 'coverLetter') setCoverLetterFile(e.target.files[0]);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("Before form data", resumeFile, coverLetterFile);
        if(resumeFile) formData.append('custom_resume', resumeFile);
        if(coverLetterFile) formData.append('cover_letter', coverLetterFile);
        formData.append('application_status', 'Under Review');
        formData.append('candidate_id', application.candidate_id || '');
        formData.append('job_id', application.job_id || '');
    
        // Log FormData content for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        try {
            const response = await axios.put(`${baseURL}/jobapps/${jobAppId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 200) {
                alert('Application updated successfully!');
                navigate(`/candidatedashboard`);
            } else {
                alert(`Please upload your resume and cover letter to submit.`);
            }
        } catch (error) {
            console.error('Error updating application:', error.response || error);
            alert(`Please upload your resume and cover letter to submit.`);
        }
    };

    const handleCancel = () => {
        navigate(`/candidateDashboard`);
    };

    if (!application.job_id) return <div>Loading...</div>;

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Card sx={{ p: 3 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Edit Application
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Application ID:</strong> {jobAppId}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Candidate ID:</strong> {application.candidate_id}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Date Applied:</strong> {new Date(application.date_applied).toLocaleDateString()}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Cover Letter:</strong>
                        </Typography>
                        <TextField
                            type="file"
                            name="coverLetter"
                            onChange={handleFileChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                            <strong>Custom Resume:</strong>
                        </Typography>
                        <TextField
                            type="file"
                            name="resume"
                            onChange={handleFileChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="contained" color="primary" onClick={handleSave}>Save</Button>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>Cancel</Button>
                    </CardActions>
                    {submissionStatus && <Typography variant="body2" sx={{ mt: 2 }}>{submissionStatus}</Typography>}
                </Card>
            </Grid>
        </Grid>
    );
};

export default EditApplication;

