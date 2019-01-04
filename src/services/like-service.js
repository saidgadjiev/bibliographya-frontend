const axios = require('axios')

export default {
  like,
  unlike
}

function like (biographyId) {
  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/likes')
}
function unlike (biographyId) {
  return axios.delete(process.env.REST_SERVER + 'biographies/' + biographyId + '/likes')
}
