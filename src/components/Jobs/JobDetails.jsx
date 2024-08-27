// JobDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import './index.css';

const JobDetails = () => {
    const { jid } = useParams(); // Extract job ID from URL
    const [job, setJob] = useState(null);

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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    if (!job) return <div>Loading...</div>;

    return (
        <div>
        
            <div className="fw-bold"> {job.job_title} </div>
            <div>Date Listed: {formatDate(job.date_listed) || "N/A"}</div>
            <div>Job Description: {job.job_description || "N/A"}</div>
            <div>Listing Status: {job.listing_status || "N/A"}</div>
        </div>
    );
};

export default JobDetails;
