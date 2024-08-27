import react from 'react';
import {useState} from 'react';

const ApplicationPostingForm = () => {
    const [dateApplied, setDateApplied] = useState('');
    const onDateAppliedChange = (e) => setDateApplied(e);

    const [candidateCoverLetter, setCoverLetter] = useState('');
    const onCoverLetterChange = (e) => setCoverLetter(e);

    const [candidateResume, setResume] = useState('');
    const onResumeChange = (e) => setResume(e);

    const [candidateName, setCandidateName] = useState('')
    const onCandidateNameChange = (e) => setCandidateName(e);

    const [candidateEmail, setEmail] = useState('');
    const onEmailChange = (e) => setEmail(e);

    const [candidateAddress, setCandidateAddress] = useState('');
    const onCandidateAddressChange = (e) => setCandidateAddress(e);

    const [candidatePhone, setCandidatePhone] = useState('');
    const onCandidatePhoneChange = (e) => setCandidatePhone(e);


                                                                            
    return (
    <ul className='list-group'> 
        <div className='row'>
        <div className='col-3'></div>
        </div>
        <div className='col-6'>
            <div className='mt-3'>
                <label htmlFor='setCandidateName'>Candidate Name:</label>
                <input type="text" className='form-control' id="inputCandidateName" placeholder="Enter Name"
                value={candidateName} onChange={setCandidateName}></input>
            </div>
            <div className='mt-3'>
                <label htmlFor='setEmail'>Candidate Email:</label>
                <input type='text' className='form-control' id='inputEmail' placeholder="Enter Email"
                 value={candidateEmail} onChange={setEmail}></input>
            </div>
            <div>
                <label htmlFor='candidateAddress'>Candidate Address:</label>
                <input type='text' className='form-control' id='inputAddress' placeholder="Enter Address"
                value={candidateAddress} onChange={(setCandidateAddress)}></input>
            </div>
            <div>
                <label htmlFor='candidatePhone'>Candidate Phone:</label>
                <input type='text' className='form-control' id='inputPhone' placeholder="Enter Phone Number"
                value={candidatePhone} onChange={(setCandidatePhone)}></input>
            </div>
            <div>
                <label htmlFor='candidateCoverLetter'>Candidate Cover Letter</label>
                <input type='text' className='form-control' id='inputCoverLetter' placeholder="Cover Letter"
                value={candidateCoverLetter} onChange={(onCoverLetterChange)}></input>
            </div>
            <div>
                <label htmlFor='candidateResume'>Candidate Resume</label>
                <input type='text' className='form-control' id='inputResume' placeholder='Resume'
                value={candidateResume} onChange={(onResumeChange)}></input>
            </div>

        </div>
    </ul>
    );                                                                                                                    

}