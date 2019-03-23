import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getBiographies,
  assignMe,
  complete,
  userComplete
}

function getBiographies (limit, offset, biographyClampSize, query, sort) {
  let parameters = 'limit=' + limit + '&offset=' + offset

  if (query) {
    parameters += '&q=' + query
  }

  if (biographyClampSize) {
    parameters += '&biographyClampSize=' + biographyClampSize
  }

  if (sort) {
    parameters += '&' + sort
  }

  return axios.get(getRestUrl('biographies/moderation') + '?' + parameters)
}

function assignMe (biographyId, json) {
  return axios.patch(getRestUrl('biographies/' + biographyId + '/moderation/assign-me/'), json)
}

function complete (biographyId, json) {
  return axios.patch(getRestUrl('biographies/' + biographyId + '/moderation/complete/'), json)
}

function userComplete (biographyId, json) {
  return axios.patch(getRestUrl('biographies/' + biographyId + '/moderation/user-complete/'), json)
}
