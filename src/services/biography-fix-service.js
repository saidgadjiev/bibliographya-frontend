import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getFixes,
  suggest,
  assignMe,
  complete
}

function getFixes (limit, offset, query) {
  return axios.get(getRestUrl('fixes') + '?limit=' + limit + '&offset=' + offset + (query ? '&q=' + query : ''))
}

function suggest (biographyId, fixText) {
  return axios.post(getRestUrl('biographies/' + biographyId + '/fixes'), {
    fixText: fixText
  })
}

function assignMe (fixId, json) {
  return axios.patch(getRestUrl('fixes/' + fixId + '/assign-me/'), json)
}

function complete (fixId, json) {
  return axios.patch(getRestUrl('fixes/' + fixId + '/complete/'), json)
}
