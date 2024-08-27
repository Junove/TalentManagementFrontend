import axios from 'axios';
import baseURL from '../constants/baseURL';

export const getAllApplications = (setApplications) => {
    axios.get(`${baseURL}/jobapps`)
        .then((response) => setApplications(response.data))
        .catch((error) => console.error(error))
};

