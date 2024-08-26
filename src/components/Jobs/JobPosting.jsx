import {Link} from "react-router-dom";
const JobPosting = (

) => {
    return (

        <div>
            <li className = "list-group-item override-search-light-grey" >
                <div className="row">
                    <div className = "col-9">
                        <div className="fw-bold"> Job Title </div>
                        <div> Date Listed: </div>
                        <div>  Job Description: </div>
                        <div> Listing Status: </div>


                    </div>
                    <div className="col-3">
                    <Link to={`../apply`} className="btn btn-dark rounded-pill mt-2"
                                >Apply Here</Link>

                    </div>

                

                </div>

            </li>
            
            
        </div>
    )

}

export default JobPosting;