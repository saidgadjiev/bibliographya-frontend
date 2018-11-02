const axios = require('axios')

export default {
  getBiographyByUsername
}

function getBiographyByUsername (username) {
  return axios.get(process.env.REST_SERVER + 'api/biography/' + username)
}
