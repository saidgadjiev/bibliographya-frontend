import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getBiographies,
  assignMe,
  complete,
  userComplete
}

function getBiographies (limit, offset, query, sort) {
  return axios.get(getRestUrl('biographies/moderation') + '?' +
    'limit=' + limit +
    '&offset=' + offset +
    (query ? '&q=' + query : '') +
    (sort ? '&' + sort : '')
  )
}

function assignMe (biographyId, json) {
  return axios.patch(getRestUrl('biographies/' + biographyId + '/moderation/assign-me/'), json)
}

function complete (biographyId, json) {
  return axios.patch(getRestUrl('biographies/' + biographyId + '/moderation/complete/'), json)
}

function userComplete (biographyId, json) {
  return axios.patch(getRestUrl('biographies/' + biographyId + '/moderation/user/complete/' + biographyId), json)
}
