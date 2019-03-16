import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getRoles,
  createRole,
  deleteRole
}

function getRoles () {
  return axios.get(getRestUrl('roles'))
}

function createRole (role) {
  return axios.post(getRestUrl('roles/' + role))
}

function deleteRole (role) {
  return axios.delete(getRestUrl('roles/' + role))
}
