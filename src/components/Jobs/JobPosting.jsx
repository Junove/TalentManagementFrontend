import {Link} from "react-router-dom";
import './index.css'
const JobPosting = (

) => {
    return (

        <div>
            <li className = "list-group-item rounded override-color" >
                <div className="row">
                    <div className = "col-9">
                        <div className="fw-bold"> Job Title </div>
                        <div> Date Listed: </div>
                        <div>  Job Description: </div>
                        <div> Listing Status: </div>


                    </div>
                    <div className="col-3 d-flex flex-column align-items-start">
                    <Link to={`../apply`} className="btn btn-dark rounded-pill override-blue mt-2" 
                                >Apply Here</Link>
                    <Link to={`../jobpost`} className="btn btn-dark rounded-pill override-red mt-2" 
                                >View Job</Link>

                    </div>

                

                </div>

            </li>
            
            
        </div>
    )

}

export default JobPosting;