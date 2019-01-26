import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  like,
  unlike
}

function like (biographyId, params) {
  return axios.post(getRestUrl('biographies/' + biographyId + '/likes') + (params ? '?' + params : ''))
}

function unlike (biographyId, params) {
  return axios.delete(getRestUrl('biographies/' + biographyId + '/likes') + (params ? '?' + params : ''))
}
