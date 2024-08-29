// JobDetails.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../Login/LoginContext";
import { GoBackButton } from "../Admin/GoBackButton";
import axios from 'axios';
import './index.css';

const JobDetails = () => {
    const { jid } = useParams(); // Extract job ID from URL
    const [job, setJob] = useState(null);
    const { isLoggedIn, username, logout } = useContext(LoginContext);

    const navigate = useNavigate();

    const handleApplyClick = () => {
        if (isLoggedIn) {
            if (job.listing_status === 'Open') {
                navigate(`../apply/${job.id}`);
            }
        } else {
            navigate('/login');
            alert('You must log in to apply!')
        }
    };

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
           
            <div className="row pt-4">
                <div className="col-2">
                <button className='btn btn-dark override-blue'  onClick={() => navigate('/search')}> {'< Back'}</button>
                </div>
                <div className ="col-7">

                <div className="fw-bold h2"> {job.job_title} </div>

                </div>
                <div className="col-3 d-flex flex-column align-items-start">
                {job.listing_status === 'Open' ? 
                (
                        <button className="btn btn-dark override-blue mt-2" onClick={handleApplyClick}
                                >Apply Here
                        </button>
                ) : (
                    <div>Posting closed</div>
                )
                }

                    </div>

        <div className = "row pt-4">
                <div className = "col-3">
                   <div className="h6 fw-bold">
                   Date Listed:
                    </div>
                        </div>
                <div className = "col-9">
                {formatDate(job.date_listed) || "N/A"}
                </div>

            </div>

            <div className = "row">
                <div className = "col-3">
                   <div className="h6 fw-bold">
                   Department:
                    </div>
                        </div>
                <div className = "col-9">
                {job.department|| "N/A"}
                </div>    
            </div>

            <div className = "row">
                <div className = "col-3">
                   <div className="h6 fw-bold">
                   Additional Information:
                    </div>
                        </div>
                <div className = "col-9">
                {job.additional_information|| "N/A"}
                </div>    
            </div>

            <div className = "row">
                <div className = "col-3">
                   <div className="h6 fw-bold">
                   Job Description:
                    </div>
                        </div>
                <div className = "col-9">
                {job.job_description || "N/A"}
                </div>

            </div>

            <div className = "row">
                <div className = "col-3">
                   <div className="h6 fw-bold">
                   Listing Status:
                    </div>
                        </div>
                <div className = "col-9 text-left">
                {job.listing_status || "N/A"}
                </div>

            </div>

            <div className = "row">
                <div className = "col-3">
                   <div className="h6 fw-bold">
                   Date Closed:
                    </div>
                        </div>
                <div className = "col-9">
                {job.date_closed|| "N/A"}
                </div>    
            </div>

            
                                

            </div>

            
        
            
            
            
            
        </div>
    );
};

export default JobDetails;
