import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  isExistEmail,
  restorePassword,
  savePassword,
  changeEmail,
  saveEmail,
  changePassword,
  verifyEmailStart,
  verifyEmailFinish
}

function isExistEmail (email) {
  return axios.head(getRestUrl('user-accounts/exist/' + email))
}

function restorePassword (email) {
  return axios.post(getRestUrl('user-accounts/restore-password/start') + '?email=' + email)
}

function savePassword (passwordForm) {
  return axios.post(getRestUrl('user-accounts/save-password'), passwordForm)
}

function changeEmail (email) {
  return axios.post(getRestUrl('user-accounts/save-email/start') + '?email=' + email)
}

function saveEmail (emailForm) {
  return axios.post(getRestUrl('user-accounts/save-email/finish'), emailForm)
}

function changePassword (restoreForm) {
  return axios.post(getRestUrl('user-accounts/restore-password/finish'), restoreForm)
}

function verifyEmailStart (email) {
  return axios.post(getRestUrl('user-accounts/verify-email/start') + '?email=' + email)
}

function verifyEmailFinish (emailForm) {
  return axios.post(getRestUrl('user-accounts/verify-email/finish'), emailForm)
}
