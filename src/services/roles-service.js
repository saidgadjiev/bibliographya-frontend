const axios = require('axios')

export default {
  getRoles,
  createRole,
  deleteRole
}

function getRoles () {
  return axios.get(process.env.REST_SERVER + 'roles')
}

function createRole (role) {
  return axios.post(process.env.REST_SERVER + 'roles/' + role)
}

function deleteRole (role) {
  return axios.delete(process.env.REST_SERVER + 'roles/' + role)
}
