const axios = require('axios')

export default {
  getFixes,
  suggest,
  assignMe,
  complete
}

function getFixes (limit, offset, query) {
  return axios.get(process.env.REST_SERVER + 'fixes?limit=' + limit + '&offset=' + offset + (query ? '&q=' + query : ''))
}

function suggest (biographyId, fixText) {
  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/fixes', {
    fixText: fixText
  })
}

function assignMe (fixId, json) {
  return axios.patch(process.env.REST_SERVER + 'fixes/' + fixId + '/assign-me/', json)
}

function complete (fixId, json) {
  return axios.patch(process.env.REST_SERVER + 'fixes/' + fixId + '/complete/', json)
}
