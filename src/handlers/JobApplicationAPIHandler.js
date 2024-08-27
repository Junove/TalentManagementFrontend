import axios from 'axios';
import baseURL from '../constants/baseURL';

export const getAllApplications = (setApplications) => {
    axios.get(`${baseURL}}/jobapps`)
        .then((response) => response.json())
        .then((json) => setApplications(json))
};

