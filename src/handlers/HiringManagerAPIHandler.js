import axios from 'axios';

import baseURL from '../constants/baseURL';

export const getHiringManagerByUserId = (setHiringManager, userID) => {
    axios.get(`${baseURL}/managers`)
    .then((response) => {setHiringManager(response.data.find((hm) => hm.user.id === userID)); console.log(response.data.find((hm) => hm.user.id === userID))})
    .catch((error) => console.error(error))
};

export const getAllHiringManagers = (setHiringManager) => {
    axios.get(`${baseURL}/managers`)
    .then((response) => {setHiringManager(response.data); console.log(response.data)})
    .catch((error) => console.error(error))
};
