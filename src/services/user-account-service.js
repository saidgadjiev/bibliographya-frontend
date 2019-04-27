import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getAccount
}

function getAccount (id) {
  return axios.get(getRestUrl('user-accounts/' + id))
}
