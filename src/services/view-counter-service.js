import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  hit
}

function hit (biographyId) {
  return axios.post(getRestUrl('vc/' + biographyId))
}
