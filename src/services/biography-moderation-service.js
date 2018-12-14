const axios = require('axios')

export default {
  getBiographies,
  assignMe
}

function getBiographies (limit, offset, filter) {
  return axios.get(
    process.env.REST_SERVER + 'api/biography/moderation?limit=' + limit + '&offset=' + offset + (filter ? '&' + filter : '')
  )
}

function assignMe (biographyId) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/assign-me/' + biographyId)
}
