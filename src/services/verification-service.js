import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  verify,
  resend
}

function verify (code) {
  return axios.post(getRestUrl('verifications/verify') + '?code=' + code)
}

function resend () {
  return axios.post(getRestUrl('verifications/resend'))
}
