import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getMagick
}

function getMagick (magickText) {
  return axios.get(getRestUrl('magick') + '?magickText=' + encodeURIComponent(magickText))
}
