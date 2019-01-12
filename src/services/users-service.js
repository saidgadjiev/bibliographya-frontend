const axios = require('axios')

export default {
  getUsers,
  deleteRole,
  addRole
}

function getUsers (limit, offset, query) {
  return axios.get(process.env.REST_SERVER + 'users?limit=' + limit + '&offset=' + offset + (query ? '&' + query : ''))
}

function deleteRole (userId, role) {
  return axios.delete(process.env.REST_SERVER + 'users/' + userId + '/roles/' + role)
}

function addRole (userId, role) {
  return axios.post(process.env.REST_SERVER + 'users/' + userId + '/roles/' + role)
}
