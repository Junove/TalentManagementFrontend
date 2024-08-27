import axios from 'axios';

import baseURL from '../constants/baseURL';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const post = (job) => {
    axios.post(`${baseURL}/jobs`, job)
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
};