import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  signIn,
  signUp,
  signOut,
  getAccount,
  getOauthUrl,
  socialSignIn
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

function getOauthUrl (provider) {
  return axios.post(getRestUrl('auth/oauth/' + provider))
}

function socialSignIn (provider, code) {
  return axios.post(getRestUrl('auth/signIn/' + provider) + '?code=' + code)
}
