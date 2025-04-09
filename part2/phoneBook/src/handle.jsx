// handle.jsx
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const addPerson = (newPerson) => {
    console.log("handle add")
    return axios.post(baseUrl, newPerson)
                .then(res => res.data)
}

const getAll = () => {
    return axios.get(baseUrl)
                .then(res => res.data)
}

const getPerson = (id) => {
    return axios.get(`${baseUrl}/${id}`)
                .then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
                .then(res => res.data)
}

const updatePerson = (id, newData) => {
    return axios.put(`${baseUrl}/${id}`, newData)
                .then(res => res.data)
}

export {addPerson, getAll, deletePerson, getPerson, updatePerson}