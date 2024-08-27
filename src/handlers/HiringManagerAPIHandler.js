import axios from 'axios';

import baseURL from '../constants/baseURL';

export const getHiringManagerByUserId = (setHiringManager, userID) => {
    axios.get(`${baseURL}/managers/userId/${userID}`)
    .then((response) => {setHiringManager(response.data); console.log(response.data)})
    .catch((error) => console.error(error))
};