import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getMagick
}

function getMagick (providerId, magickText, magickPointSize) {
  return axios.get(getRestUrl('magick/' + providerId) + '?magickText=' + encodeURIComponent(magickText) + '&magickPointSize=' + magickPointSize)
}
