import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  getStats
}

function getStats () {
  return axios.get(getRestUrl('stats'))
}
