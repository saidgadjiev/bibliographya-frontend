import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  isExistEmail
}

function isExistEmail (email) {
  return axios.head(getRestUrl('user-accounts/exist/' + email))
}
