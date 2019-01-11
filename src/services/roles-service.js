const axios = require('axios')

export default {
  getRoles
}

function getRoles () {
  return axios.get(process.env.REST_SERVER + 'roles')
}
