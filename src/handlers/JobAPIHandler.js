import axios from 'axios';
import baseURL from '../constants/baseURL';

export const post = (job) => {
    axios.post(`${baseURL}/`, job)
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
};