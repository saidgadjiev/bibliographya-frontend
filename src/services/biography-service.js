const axios = require('axios')

export default {
  getBiographyByUsername,
  getBiographies
}

function getBiographyByUsername (username) {
  return axios.get(process.env.REST_SERVER + 'api/biography/' + username)
}

function getBiographies (page) {
  return axios.get(process.env.REST_SERVER + 'api/biography?page=' + page + '&size=' + 20)
}
