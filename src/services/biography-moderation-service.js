const axios = require('axios')

export default {
  getBiographies,
  assignMe,
  complete,
  userComplete
}

function getBiographies (limit, offset, query, sort) {
  return axios.get(process.env.REST_SERVER + 'biographies/moderation?' +
    'limit=' + limit +
    '&offset=' + offset +
    (query ? '&q=' + query : '') +
    (sort ? '&' + sort : '')
  )
}

function assignMe (biographyId, json) {
  return axios.patch(process.env.REST_SERVER + 'biographies/' + biographyId + '/moderation/assign-me/', json)
}

function complete (biographyId, json) {
  return axios.patch(process.env.REST_SERVER + 'biographies/' + biographyId + '/moderation/complete/', json)
}

function userComplete (biographyId, json) {
  return axios.patch(process.env.REST_SERVER + 'biographies/' + biographyId + '/moderation/user/complete/' + biographyId, json)
}
