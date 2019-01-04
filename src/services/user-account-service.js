const axios = require('axios')

export default {
  isExistUsername
}

function isExistUsername (username) {
  return axios.head(process.env.REST_SERVER + 'users/exist/' + username)
}
