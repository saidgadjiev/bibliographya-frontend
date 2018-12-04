const axios = require('axios')

export default {
  getBiography,
  getBiographyById,
  getBiographies,
  update,
  create
}

function getBiography (username, filter) {
  return axios.get(process.env.REST_SERVER + 'api/biography' + (filter ? '?' + filter : ''))
}

function getBiographyById (id) {
  return axios.get(process.env.REST_SERVER + 'api/biography/' + id)
}

function getBiographies (limit, offset, filter, category) {
  return axios.get(process.env.REST_SERVER + 'api/biography/biographies/' + category + '?limit=' + limit + '&offset=' + offset + (filter ? '&' + filter : ''))
}

function update (biography) {
  return axios.put(process.env.REST_SERVER + 'api/biography/update/' + biography.id, biography)
}

function create (biography) {
  return axios.post(process.env.REST_SERVER + 'api/biography/create', biography)
}
