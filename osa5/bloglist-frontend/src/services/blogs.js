import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = {
  headers: { Authorization: token }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config.headers.Authorization = token
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(exception => {
      return Promise.reject(exception.response.data)
    })
}

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject, config)
    .then(response => {
      return response.data
    })
    .catch(exception => {
      return Promise.reject(exception.response.data)
    })
}

const update = (id, newObject) => {
  console.log(id, newObject)
  return axios
    .put(`${baseUrl}/${id}`, newObject, config)
    .then(response => response.data)
    .catch(exception =>
      Promise.reject(exception.response.data)
    )
}

const remove = (id) => {
  console.log('Removing', id)
  console.log(config)

  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then(response => response.data)
    .catch(exception =>
      Promise.reject(exception.response.data)
    )
}

export default { getAll, create, update, setToken, remove }