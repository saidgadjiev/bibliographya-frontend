import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getFixes,
  suggest,
  assignMe,
  complete
}

function getFixes (limit, offset, biographyClampSize, query) {
  let parameters = 'limit=' + limit + '&offset=' + offset

  if (query) {
    parameters += '&q=' + query
  }

  if (biographyClampSize) {
    parameters += '&biographyClampSize=' + biographyClampSize
  }

  return axios.get(getRestUrl('fixes') + '?' + parameters)
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
