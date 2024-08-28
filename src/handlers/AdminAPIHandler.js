import axios from 'axios';

import baseURL from '../constants/baseURL';

export const getAllAdministrators = (setAdministrators) => {
    axios.get(`${baseURL}/admins`)
    .then((response) => {setAdministrators(response.data)})
    .catch((error) => console.error(error))
}

export const deleteById = (id, postOpCallback) => {
    axios.delete(`${baseURL}/admins/${id}`)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const post = (item, postOpCallback) => {
    delete item.id;
    axios.post(`${baseURL}/admins`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const put = (item, postOpCallback) => {
    axios.put(`${baseURL}/admins/${item.id}`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}
