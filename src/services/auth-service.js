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

  return axios.post(process.env.REST_SERVER + 'auth/signIn', json)
}

function signUp (signUpForm) {
  let json = {
    username: signUpForm.username,
    password: signUpForm.password,
    firstName: signUpForm.firstName,
    lastName: signUpForm.lastName,
    middleName: signUpForm.middleName
  }

  return axios.post(process.env.REST_SERVER + 'auth/signUp', json)
}

function signOut () {
  return axios.post(process.env.REST_SERVER + 'auth/signOut')
}

function getAccount () {
  return axios.get(process.env.REST_SERVER + 'auth/account')
}

function getOauthUrl (provider) {
  return axios.post(process.env.REST_SERVER + 'auth/oauth/' + provider)
}

function socialSignIn (provider, code) {
  return axios.post(process.env.REST_SERVER + 'auth/signIn/' + provider + '?code=' + code)
}
