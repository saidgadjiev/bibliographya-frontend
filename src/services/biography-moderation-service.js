const axios = require('axios')

export default {
  getBiographies,
  assignMe,
  complete,
  userComplete
}

function getBiographies (limit, offset, filter) {
  return axios.get(
    process.env.REST_SERVER + 'api/biography/moderation?limit=' + limit + '&offset=' + offset + (filter ? '&' + filter : '')
  )
}

function assignMe (biographyId, json) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/assign-me/' + biographyId, json)
}

function complete (biographyId, json) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/complete/' + biographyId, json)
}

function userComplete (biographyId, json) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/user/complete/' + biographyId, json)
}
