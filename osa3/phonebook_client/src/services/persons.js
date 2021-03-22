import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'//'https://arden-servu.herokuapp.com/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const add = (newPerson) => {
    return axios.post(baseUrl, newPerson)
    .then(response => response.data)
    //promise.catch(err => {console.log('catch', err.response.data)})
    //return promise    
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
        .then(response => response.data)
        
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personService = { getAll, add, update, remove }
export default personService
