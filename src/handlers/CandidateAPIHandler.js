import axios from 'axios';

import baseURL from '../constants/baseURL';

export const getCandidateByUserId = (setCandidates, userID) => {
    axios.get(`${baseURL}/candidates`)
    .then((response) => {setCandidates(response.data.find((candidate) => candidate.user.id === userID)); console.log(response.data.find((candidate) => candidate.user.id === userID))})
    .catch((error) => console.error(error))
};

export const getAllCandidates = (setCandidates) => {
    axios.get(`${baseURL}/candidates`)
    .then((response) => {setCandidates(response.data)})
    .catch((error) => console.error(error))
}

export const deleteById = (id, postOpCallback) => {
    axios.delete(`${baseURL}/candidates/${id}`)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const post = (item, postOpCallback) => {
    delete item.id;
    axios.post(`${baseURL}/candidates`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const put = (item, postOpCallback) => {
    axios.put(`${baseURL}/candidates/${item.id}`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const getCandidateById = (setCandidates, id) => {
    axios.get(`${baseURL}/candidates/${id}`)
    .then((response) => {setCandidates(response.data); console.log(response.data)})
    .catch((error) => console.error(error))
};