import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  verify,
  resend
}

function verify (email, code) {
  return axios.post(getRestUrl('emails/resend') + '?email=' + email + '&code=' + code)
}

function resend (email) {
  return axios.post(getRestUrl('emails/resend') + '?email=' + email)
}
