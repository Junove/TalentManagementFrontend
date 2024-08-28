import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import JobDetails from "./JobDetails.jsx";
import { LoginContext } from '../Login/LoginContext.jsx';
import React, { useContext } from 'react';


const JobPosting = ( {job}

) => {

    const { isLoggedIn, username, logout } = useContext(LoginContext);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    return (

        <div>
            <div className="pb-2"> 
            <li className = "list-group-item rounded override-color" >
                <div className="row">
                    <div className = "col-9">
                        <div className="fw-bold"> {job.job_title} </div>
                        <div>Date Listed: {formatDate(job.date_listed) || "N/A"}</div>
                        <div>Job Description: {job.job_decription || "N/A"}</div>
                        <div>Listing Status: {job.listing_status || "N/A"}</div>


                    </div>
                    <div className="col-3 d-flex flex-column align-items-start">
                        {isLoggedIn ? (
                            <div>
                                <Link to={`../apply/${job.id}`} className="btn btn-dark override-blue mt-2" 
                                >Apply Here
                                </Link>
                            </div>) : 
                            (
                                <div>
                                        {/* <button className="btn btn-dark override-blue mt-2" 
                                            onClick={function handleClick() { alert ('Login first to apply')}}>
                                            Apply
                                        </button> */}
                                        <Link to="/login" className="btn btn-dark override-blue mt-2"  onClick={function handleClick() { alert ('Login first to apply')}}>
                                                Apply
                                        </Link>
                                </div>
                            )
                            }
                        
                        
                        <Link to={`../jobpost/${job.id}`} className="btn btn-dark  override-red mt-2" 

                                >View Job</Link>
                 
                    

                    </div>

                

                </div>

            </li>
            
            </div>
        </div>
    )

}

export default JobPosting;