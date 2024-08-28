import axios from 'axios';

import baseURL from '../constants/baseURL';

export const getAllUsers = (setUsers, role_type = null) => {
    axios.get(`${baseURL}/users`)
    .then(
        (response) => 
        {setUsers(
            response.data.filter(
                (user) => role_type === null || user.type === role_type
            )
        )})
    .catch((error) => console.error(error))
}

export const deleteById = (id, postOpCallback) => {
    axios.delete(`${baseURL}/users/${id}`)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const post = (item, postOpCallback) => {
    delete item.id;
    axios.post(`${baseURL}/users`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}

export const put = (item, postOpCallback) => {
    axios.put(`${baseURL}/users/${item.id}`, item)
    .then((response) => postOpCallback())
    .catch((error) => console.error(error))
}
