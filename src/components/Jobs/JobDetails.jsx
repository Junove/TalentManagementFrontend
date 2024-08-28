// JobDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import './index.css';

const JobDetails = () => {
    const { jid } = useParams(); // Extract job ID from URL
    const [job, setJob] = useState(null);
    const { isLoggedIn, username, logout } = useContext(LoginContext);

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
                <div className ="col-9">

                <div className="fw-bold h2"> {job.job_title} </div>

                </div>
                <div className="col-3 d-flex flex-column align-items-start">
                {isLoggedIn ? 
                (
                        <Link to={`../apply`} className="btn btn-dark override-blue mt-2" 
                                >Apply Here
                        </Link>
                ) : (
                    <Link to="/login" className="btn btn-dark override-blue mt-2"  onClick={function handleClick() { alert ('Login first to apply')}}>
                        Apply
                    </Link>
                )
                }

                    </div>

        <div className = "row">
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
