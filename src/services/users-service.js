import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getUsers,
  deleteRole,
  addRole
}

function getUsers (limit, offset, query) {
  return axios.get(getRestUrl('users') + '?limit=' + limit + '&offset=' + offset + (query ? '&' + query : ''))
}

function deleteRole (userId, role) {
  return axios.delete(getRestUrl('users/') + userId + '/roles/' + role)
}

function addRole (userId, role) {
  return axios.post(getRestUrl('users/' + userId + '/roles/' + role))
}
