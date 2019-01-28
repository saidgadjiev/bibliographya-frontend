import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  signIn,
  signUp,
  signOut,
  getAccount,
  getOauthUrl,
  socialSignIn,
  errorSocialSignIn
}

function signIn (signInForm) {
  let json = {
    username: signInForm.username,
    password: signInForm.password
  }

  return axios.post(getRestUrl('auth/signIn'), json)
}

function signUp (signUpForm) {
  let json = {
    username: signUpForm.username,
    password: signUpForm.password,
    firstName: signUpForm.firstName,
    lastName: signUpForm.lastName,
    middleName: signUpForm.middleName
  }

  return axios.post(getRestUrl('auth/signUp'), json)
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
