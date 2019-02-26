import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  isExistEmail,
  restorePassword
}

function isExistEmail (email) {
  return axios.head(getRestUrl('user-accounts/exist/' + email))
}

function restorePassword (email) {
  return axios.post(getRestUrl('user-accounts/restore-password') + '?email=' + email)
}
