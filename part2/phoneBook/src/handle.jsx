import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const addPerson = (newPerson) => {
    console.log("handle add")
    return axios.post(baseUrl, newPerson)
                .then(res => res.data)
                .catch(err => err)
}

const getAll = () => {
    return axios.get(baseUrl)
                .then(res => res.data)
                .catch(err => err)
}

const getPerson = (id) => {
    return axios.get(`${baseUrl}/${id}`)
                .then(res => res.data)
                .catch(err => err)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
                .then(res => res.data)
                .catch(err => err)
}

const updatePerson = (id, newData) => {
    return axios.put(`${baseUrl}/${id}`, newData)
    .then(res => res.data)
    .catch(err => err)
}

export {addPerson, getAll, deletePerson, getPerson, updatePerson}