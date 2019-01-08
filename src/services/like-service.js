const axios = require('axios')

export default {
  like,
  unlike
}

function like (biographyId, params) {
  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/likes' + (params ? '?' + params : ''))
}

function unlike (biographyId, params) {
  return axios.delete(process.env.REST_SERVER + 'biographies/' + biographyId + '/likes' + (params ? '?' + params : ''))
}
