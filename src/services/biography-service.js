const axios = require('axios')

export default {
  getBiographyByUsername,
  getBiographyById,
  getBiographies,
  update,
  create
}

function getBiographyByUsername (username) {
  return axios.get(process.env.REST_SERVER + 'api/biography/username/' + username)
}

function getBiographyById (id) {
  return axios.get(process.env.REST_SERVER + 'api/biography/id/' + id)
}

function getBiographies (limit, offset) {
  return axios.get(process.env.REST_SERVER + 'api/biography?limit=' + limit + '&offset=' + offset)
}

function update (biography) {
  return axios.put(process.env.REST_SERVER + 'api/biography/update/' + biography.id, biography)
}

function create (biography) {
  return axios.put(process.env.REST_SERVER + 'api/biography/create', biography)
}
