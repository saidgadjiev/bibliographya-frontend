import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  isExistUsername
}

function isExistUsername (username) {
  return axios.head(getRestUrl('users/exist/' + username))
}
