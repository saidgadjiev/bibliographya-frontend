import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getProfessions
}

function getProfessions () {
  return axios.get(getRestUrl('professions'))
}
