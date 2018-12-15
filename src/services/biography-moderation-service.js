const axios = require('axios')

export default {
  getBiographies,
  assignMe,
  approve,
  reject,
  release
}

function getBiographies (limit, offset, filter) {
  return axios.get(
    process.env.REST_SERVER + 'api/biography/moderation?limit=' + limit + '&offset=' + offset + (filter ? '&' + filter : '')
  )
}

function assignMe (biographyId) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/assign-me/' + biographyId)
}

function approve (biographyId) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/approve/' + biographyId)
}

function reject (biographyId) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/reject/' + biographyId)
}

function release (biographyId) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/moderation/release/' + biographyId)
}
