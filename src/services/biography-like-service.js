import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getLikes
}

function getLikes (biographyId, limit, offset) {
  return axios.get(getRestUrl('biographies/' + biographyId + '/likes') + '?limit=' + limit + '&offset=' + offset)
}
