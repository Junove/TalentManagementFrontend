import axios from 'axios';

import baseURL from '../constants/baseURL';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getJobById = (setJob, jobID) => {
    axios.get(`${baseURL}/jobs/${jobID}`)
    .then((response) => {setJob(response.data); console.log(response.data)})
    .catch((error) => console.error(error))
};

export const getAllJobs = (setJobs) => {
    axios.get(`${baseURL}/jobs`)
    .then((response) => {setJobs(response.data)})
    .catch((error) => console.error(error))
}

export const deleteById = (id, postOpCallback) => {
    axios.delete(`${baseURL}/jobs/${id}`)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const post = (item, postOpCallback) => {
    delete item.id;
    axios.post(`${baseURL}/jobs`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const put = (item, postOpCallback) => {
    axios.put(`${baseURL}/jobs/${item.id}`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}
