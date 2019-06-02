import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getCountries
}

function getCountries () {
  return axios.get(getRestUrl('countries'))
}
