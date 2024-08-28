import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { post } from '../../handlers/JobAPIHandler'
import { LoginContext } from '../Login/LoginContext'
import { getHiringManagerByUserId } from '../../handlers/HiringManagerAPIHandler'


const JobPostingForm = (props) => {
    const {
        snackBarOpenHandler
    } = props

    const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);
    const [manager, setHiringManager] = useState({});

    const [autofill, setAutofill] = useState(false);

    useEffect(() => {
        console.log(`user id: ${user.id}`)
        getHiringManagerByUserId(setHiringManager,user.id);
      }, []);  


    const [jobTitle, setJobTitle] = useState('');
    const onJobTitleChange = (e) => setJobTitle(e.target.value);

    const [department, setDepartment] = useState('');
    const onDepartmentChange = (e) => {
        const departmentName = e.target.value
        setDepartment(departmentName);
        if (autofill) {
            if (departmentName === 'Software'){
                setJobDescription(`Develop, test, and maintain software applications and systems. Collaborate with cross-functional teams to design and implement new features. Troubleshoot and resolve software issues, and ensure the performance, quality, and responsiveness of applications.

                Requirements:
                
                Proficiency in at least one programming language (e.g., Java, Python, JavaScript).
                Experience with software development frameworks and tools.
                Understanding of algorithms and data structures.
                Strong problem-solving skills and ability to work in a team.
                Familiarity with version control systems like Git.`);
                setAdditionalInfo(`Knowledge of both frontend and backend technologies is a plus.
                Experience with cloud platforms (AWS, Azure) is beneficial.
                Familiarity with Agile methodologies and CI/CD processes can be advantageous.`);
            }
            if (departmentName === 'HR'){
                setJobDescription('');
                setAdditionalInfo('');
            }
        }
    }

    const [jobDescription, setJobDescription] = useState('');
    const onJobDescriptionChange = (e) => setJobDescription(e.target.value);

    const [additionalInfo, setAdditionalInfo] = useState('');
    const onAdditionalInfoChange = (e) => setAdditionalInfo(e.target.value);

    const formSubmissionHandler = () => {
        const job = {
            manager_id: manager.id,
            job_title: jobTitle,
            department: department,
            job_description: jobDescription,
            additional_information: additionalInfo
        }

        post(job)
        snackBarOpenHandler();
    }

  return (
    <ul className="list-group">
        <div className='row'>
            <div className='col-3'></div>
            <div className="col-6">
            {
                autofill ? (
                    <button className='mt-3 btn btn-primary' onClick={() => setAutofill(false)}>
                        Enabled
                    </button>
                ) : (
                    <button className='mt-3 btn btn-danger' onClick={() => setAutofill(true)}>
                        Disabled
                    </button>
                )

            }
            </div>
            
        </div>
        <div className='row'>
        <div className = "col-3">

        </div>  
            <div className='col-6'>
                <div className="mt-3">
                    <label htmlFor="inputJobTitle">Job Title</label>
                    <input type="text" className="form-control" id="inputJobTitle" aria-describedby="emailHelp" placeholder="Enter job title"
                        value={jobTitle} onChange={onJobTitleChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputDepartment">Department</label>
                    <input type="text" className="form-control" id="inputDepartment" aria-describedby="emailHelp" placeholder="Enter department"
                        value={department} onChange={onDepartmentChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputJobDescription">Job Description</label>
                    <textarea className="form-control" id="inputJobDescription" aria-describedby="emailHelp" placeholder="Enter job description"
                        value={jobDescription} onChange={onJobDescriptionChange}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="inputAdditionalInfo">Additional Information</label>
                    <textarea className="form-control" id="inputAdditionalInfo" aria-describedby="emailHelp" placeholder="Enter additional information"
                        value={additionalInfo} onChange={onAdditionalInfoChange}/>
                </div>
                <button className="mt-3 btn btn-primary" onClick={formSubmissionHandler} style={{backgroundColor: 'rgb(18,28,78)', border: 'none'}}>Create</button>
                <button className="mt-3 mx-3 btn btn-secondary">Cancel</button>
            </div>
        </div>
    </ul>
  )
}

export default JobPostingForm