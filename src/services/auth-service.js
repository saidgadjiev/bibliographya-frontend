import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  signIn,
  signUp,
  cancelSignUp,
  signOut,
  getAccount,
  getOauthUrl,
  socialSignUp,
  errorSocialSignUp,
  confirmSignUpStart,
  confirmSignUpFinish,
  getConfirmation,
  socialSignIn,
  errorSocialSignIn
}

function signIn (signInForm) {
  return axios.post(getRestUrl('auth/signIn/simple'), signInForm)
}

function socialSignIn (provider, redirectUri, code) {
  return axios.post(getRestUrl('auth/signIn/' + provider) + '?code=' + code + '&redirectUri=' + redirectUri)
}

function errorSocialSignIn (provider, error, errorDescription) {
  return axios.post(getRestUrl('auth/signIn/' + provider) + '?error=' + error + (errorDescription ? '&' + errorDescription : ''))
}

function signUp (signUpForm) {
  return axios.post(getRestUrl('auth/signUp'), signUpForm)
}

function signOut () {
  return axios.post(getRestUrl('auth/signOut'))
}

function getAccount () {
  return axios.get(getRestUrl('auth/account'))
}

function getOauthUrl (provider, responseType, redirectUri) {
  return axios.post(getRestUrl('auth/oauth/' + provider) + '?redirectUri=' + redirectUri + '&responseType=' + responseType)
}

function socialSignUp (provider, redirectUri, code) {
  return axios.post(getRestUrl('auth/signUp/' + provider) + '?code=' + code + '&redirectUri=' + redirectUri)
}

function errorSocialSignUp (provider, error, errorDescription) {
  return axios.post(getRestUrl('auth/signUp/' + provider) + '?error=' + error + (errorDescription ? '&' + errorDescription : ''))
}

function confirmSignUpStart (phone, email) {
  let query = '?'

  if (phone) {
    query += 'verificationKey=' + phone
  } else {
    query += 'verificationKey=' + email
  }

  return axios.post(getRestUrl('auth/signUp/confirm-start') + query)
}

function confirmSignUpFinish (confirmSignUp) {
  return axios.post(getRestUrl('auth/signUp/confirm-finish'), confirmSignUp)
}

function cancelSignUp () {
  return axios.post(getRestUrl('auth/signUp/cancel'))
}

function getConfirmation () {
  return axios.get(getRestUrl('auth/signUp/confirmation'))
}
