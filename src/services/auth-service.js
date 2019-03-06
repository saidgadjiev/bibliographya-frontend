import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  signIn,
  signUp,
  cancelSignUp,
  signOut,
  getAccount,
  getOauthUrl,
  socialSignIn,
  errorSocialSignIn,
  confirmSignUp,
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

function socialSignIn (provider, redirectUri, code) {
  return axios.post(getRestUrl('auth/signIn/' + provider) + '?code=' + code + '&redirectUri=' + redirectUri)
}

function errorSocialSignIn (provider, error, errorDescription) {
  return axios.post(getRestUrl('auth/signIn/' + provider) + '?error=' + error + (errorDescription ? '&' + errorDescription : ''))
}

function confirmSignUp (code) {
  return axios.post(getRestUrl('auth/signUp/confirm') + '?code=' + code)
}

function cancelSignUp () {
  return axios.post(getRestUrl('auth/signUp/cancel'))
}

function getConfirmation () {
  return axios.get(getRestUrl('auth/signUp/confirmation'))
}
