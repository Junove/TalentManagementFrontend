import axios from 'axios';
import baseURL from '../constants/baseURL';

export const getAllApplications = (setApplications) => {
    axios.get(`${baseURL}/jobapps`)
        .then((response) => setApplications(response.data))
        .catch((error) => console.error(error))
};

export const getApplicationByUserID = (setApplications, userID) => {
    axios.get(`${baseURL}/jobapps/candidatespec/${userID}`)
        .then((response) => setApplications(response.data))
        .catch((error) => console.error(error))
};
export const getApplicationByID = (setApplication, id) => {
    axios.get(`${baseURL}/jobapps/${id}`)
        .then((response) => {setApplication(response.data); console.log(response.data)})
        .catch((error) => console.error(error))
};
