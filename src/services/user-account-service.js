import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  isExistEmail,
  restorePassword,
  savePassword,
  changeEmail,
  saveEmail
}

function isExistEmail (email) {
  return axios.head(getRestUrl('user-accounts/exist/' + email))
}

function restorePassword (email) {
  return axios.post(getRestUrl('user-accounts/restore-password') + '?email=' + email)
}

function savePassword (passwordForm) {
  return axios.post(getRestUrl('user-accounts/save-password'), passwordForm)
}

function changeEmail (email) {
  return axios.post(getRestUrl('user-accounts/change-email') + '?newEmail=' + email)
}

function saveEmail (emailForm) {
  return axios.post(getRestUrl('user-accounts/save-email'), emailForm)
}
