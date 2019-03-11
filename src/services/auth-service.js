import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  signIn,
  signUp,
  cancelSignUp,
  signOut,
  getAccount,
  getOauthUrl,
  socialSignUp,
  errorSocialSignIn,
  confirmSignUpStart,
  confirmSignUpFinish,
  getConfirmation
}

function signIn (signInForm) {
  return axios.post(getRestUrl('auth/signIn'), signInForm)
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

function getOauthUrl (provider, redirectUri) {
  return axios.post(getRestUrl('auth/oauth/' + provider) + '?redirectUri=' + redirectUri)
}

function socialSignUp (provider, redirectUri, code) {
  return axios.post(getRestUrl('auth/signUp/' + provider) + '?code=' + code + '&redirectUri=' + redirectUri)
}

function errorSocialSignIn (provider, error, errorDescription) {
  return axios.post(getRestUrl('auth/signIn/' + provider) + '?error=' + error + (errorDescription ? '&' + errorDescription : ''))
}

function confirmSignUpStart (code) {
  return axios.post(getRestUrl('auth/signUp/confirm-start') + '?code=' + code)
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
