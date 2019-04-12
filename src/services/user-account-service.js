import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  isExistEmail,
  getAccount
}

function isExistEmail (email) {
  return axios.head(getRestUrl('user-accounts/exist/' + email))
}

function getAccount (id) {
  return axios.get(getRestUrl('user-accounts/' + id))
}
