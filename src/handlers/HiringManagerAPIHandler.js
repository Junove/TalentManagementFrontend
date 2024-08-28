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

export const deleteById = (id, postOpCallback) => {
    axios.delete(`${baseURL}/managers/${id}`)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const post = (item, postOpCallback) => {
    delete item.id;
    axios.post(`${baseURL}/managers`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const put = (item, postOpCallback) => {
    axios.put(`${baseURL}/managers/${item.id}`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}
