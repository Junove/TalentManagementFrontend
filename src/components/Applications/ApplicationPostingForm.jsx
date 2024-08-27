import react from 'react';
import {useState} from 'react';

const ApplicationPostingForm = () => {
    const [candidateId, setCandidateId] = useState('');
    const onCandidateIdChange = (e) => setCandidateId(e);

    const [jobId, setJobId] = useState('');
    const onJobIdChange = (e) => setJobId(e);

    const [dateApplied, setDateApplied] = useState('');
    const onDateAppliedChange = (e) => setDateApplied(e);

    const [coverLetter, setCoverLetter] = useState('');
    const onCoverLetterChange = (e) => setCoverLetter(e);

    const [resume, setResume] = useState('');
    const onResumeChange = (e) => setResume(e);

    const [candidateName, setCandidateName] = useState('')
    const onCandidateNameChange = (e) => setCandidateName(e);

    const [email, setEmail] = useState('');
    const onEmailChange = (e) => setEmail(e);


                                                                            
    return (
    <ul className='list-group'> 
        <div className='row'>
        <div className='col-3'></div>
        </div>
        <div className='col-6'>
            <div className='mt-3'>
                <label htmlFor='setCandidateName'>Candidate Name</label>
                <input type="text" className='form-control' id="inputCandidateName" ></input>
            </div>

        </div>
    </ul>
    );                                                                                                                    

}