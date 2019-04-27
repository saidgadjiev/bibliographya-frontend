import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  verify,
  resend
}

function verify (phone, email, code) {
  let query = '?'

  if (phone) {
    query += 'verificationKey=' + phone
  } else {
    query += 'verificationKey=' + email
  }

  return axios.post(getRestUrl('verifications/verify') + query + '&code=' + code)
}

function resend (phone, email) {
  let query = '?'

  if (phone) {
    query += 'verificationKey=' + phone
  } else {
    query += 'verificationKey=' + email
  }

  return axios.post(getRestUrl('verifications/resend') + query)
}
