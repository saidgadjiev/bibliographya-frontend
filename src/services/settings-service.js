import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getEmailSettings,
  getGeneralSettings,
  restorePasswordStart,
  savePassword,
  saveEmailStart,
  saveEmailFinish,
  savePhoneStart,
  savePhoneFinish,
  restorePasswordFinish
}

function getEmailSettings () {
  return axios.get(getRestUrl('settings/general/email'))
}

function getGeneralSettings () {
  return axios.get(getRestUrl('settings/general'))
}

function restorePasswordStart (verificationKey) {
  return axios.post(getRestUrl('settings/restore-password/start') + '?verificationKey=' + verificationKey)
}

function restorePasswordFinish (restoreForm) {
  return axios.post(getRestUrl('settings/restore-password/finish'), restoreForm)
}

function savePassword (passwordForm) {
  return axios.post(getRestUrl('settings/save-password'), passwordForm)
}

function saveEmailStart (email) {
  let query = '?'

  query += 'verificationKey=' + email

  return axios.post(getRestUrl('settings/save-email/start') + query)
}

function saveEmailFinish (emailForm) {
  return axios.post(getRestUrl('settings/save-email/finish'), emailForm)
}

function savePhoneStart (phone) {
  let query = '?'

  query += 'verificationKey=' + phone

  return axios.post(getRestUrl('settings/save-phone/start') + query)
}

function savePhoneFinish (phoneForm) {
  return axios.post(getRestUrl('settings/save-phone/finish'), phoneForm)
}
