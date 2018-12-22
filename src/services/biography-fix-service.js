const axios = require('axios')

export default {
  getFixes,
  suggest,
  assignMe,
  complete
}

function getFixes (limit, offset, filter) {
  return axios.get(
    process.env.REST_SERVER + 'api/biography/fix?limit=' + limit + '&offset=' + offset + (filter ? '&' + filter : '')
  )
}

function suggest (biographyId, fixText) {
  return axios.post(process.env.REST_SERVER + 'api/biography/fix/suggest/' + biographyId, {
    fixText: fixText
  })
}

function assignMe (fixId, json) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/fix/assign-me/' + fixId, json)
}

function complete (fixId, json) {
  return axios.patch(process.env.REST_SERVER + 'api/biography/fix/complete/' + fixId, json)
}
