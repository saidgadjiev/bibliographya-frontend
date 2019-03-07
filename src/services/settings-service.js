import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  getEmailSettings,
  getGeneralSettings,
  restorePassword,
  savePassword,
  changeEmail,
  saveEmail,
  changePassword
}

function getEmailSettings () {
  return axios.get(getRestUrl('settings/general/email'))
}

function getGeneralSettings () {
  return axios.get(getRestUrl('settings/general'))
}

function restorePassword (email) {
  return axios.post(getRestUrl('settings/restore-password/start') + '?email=' + email)
}

function savePassword (passwordForm) {
  return axios.post(getRestUrl('settings/save-password'), passwordForm)
}

function changeEmail (email) {
  return axios.post(getRestUrl('settings/save-email/start') + '?email=' + email)
}

function saveEmail (emailForm) {
  return axios.post(getRestUrl('settings/save-email/finish'), emailForm)
}

function changePassword (restoreForm) {
  return axios.post(getRestUrl('settings/restore-password/finish'), restoreForm)
}

