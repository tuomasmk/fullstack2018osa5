import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blogToUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog }