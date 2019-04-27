import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getEmailSettings,
  getGeneralSettings,
  restorePasswordStart,
  savePassword,
  saveEmailStart,
  saveEmailFinish,
  restorePasswordFinish
}

function getEmailSettings () {
  return axios.get(getRestUrl('settings/general/email'))
}

function getGeneralSettings () {
  return axios.get(getRestUrl('settings/general'))
}

function restorePasswordStart (phone, email) {
  let query = '?'

  if (phone) {
    query += 'verificationKey=' + phone
  } else {
    query += 'verificationKey=' + email
  }

  return axios.post(getRestUrl('settings/restore-password/start') + query)
}

function restorePasswordFinish (restoreForm) {
  return axios.post(getRestUrl('settings/restore-password/finish'), restoreForm)
}

function savePassword (passwordForm) {
  return axios.post(getRestUrl('settings/save-password'), passwordForm)
}

function saveEmailStart (phone, email) {
  let query = '?'

  if (phone) {
    query += 'verificationKey=' + phone
  } else {
    query += 'verificationKey=' + email
  }

  return axios.post(getRestUrl('settings/save-email/start') + query)
}

function saveEmailFinish (emailForm) {
  return axios.post(getRestUrl('settings/save-email/finish'), emailForm)
}
