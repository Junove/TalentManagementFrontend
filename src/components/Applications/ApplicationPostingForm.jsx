import react from 'react';
import {useState} from 'react';

const ApplicationPostingForm = () => {
    const [candidateId, setCandidateId] = useState('');
    const onCandidateIdChange = (e) => setCandidateId(e);

    const [jobId, setJobId] = useState('');
    const onJobIdChange = (e) => setJobId(e);

}