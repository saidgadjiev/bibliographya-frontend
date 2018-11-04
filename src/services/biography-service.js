const axios = require('axios')

export default {
  getBiographyByUsername,
  getBiographyById,
  getBiographies
}

function getBiographyByUsername (username) {
  return axios.get(process.env.REST_SERVER + 'api/biography/username/' + username)
}

function getBiographyById (id) {
  return axios.get(process.env.REST_SERVER + 'api/biography/id/' + id)
}

function getBiographies (page) {
  return axios.get(process.env.REST_SERVER + 'api/biography?page=' + page + '&size=' + 20)
}
