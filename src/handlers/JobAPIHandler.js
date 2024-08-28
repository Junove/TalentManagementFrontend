import axios from 'axios';

import baseURL from '../constants/baseURL';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getJobById = (setJob, jobID) => {
    axios.get(`${baseURL}/jobs/${jobID}`)
    .then((response) => {setJob(response.data); console.log(response.data)})
    .catch((error) => console.error(error))
};

export const post = (job) => {
    axios.post(`${baseURL}/jobs`, job)
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
};

export const put = (job,snackBarOpenHandler,id) => {
    axios.put(`${baseURL}/jobs/${id}`, job)
        .then((response) => {console.log(response); snackBarOpenHandler()})
        .catch((error) => console.error(error))
};

