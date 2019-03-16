import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getStats
}

function getStats () {
  return axios.get(getRestUrl('stats'))
}
