import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = {
  headers: {Authorization: token}
}

const setToken = newToken => {
  token = `bearer ${newToken}` 
  config.headers.Authorization = token
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(id, newObject, config)
  return response.data
}

export default { getAll, create, update, setToken }