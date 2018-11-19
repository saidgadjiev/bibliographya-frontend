const axios = require('axios')

export default {
  signIn,
  signUp,
  signOut,
  getAccount,
  isExistUsername
}

function signIn (signInForm) {
  let json = {
    username: signInForm.username,
    password: signInForm.password
  }

  return axios.post(process.env.REST_SERVER + 'api/auth/signIn', json)
}

function signUp (signUpForm) {
  let json = {
    username: signUpForm.username,
    password: signUpForm.password,
    firstName: signUpForm.firstName,
    lastName: signUpForm.lastName,
    middleName: signUpForm.middleName
  }

  return axios.post(process.env.REST_SERVER + 'api/auth/signUp', json)
}

function signOut () {
  return axios.post(process.env.REST_SERVER + 'api/auth/signOut')
}

function getAccount () {
  return axios.get(process.env.REST_SERVER + 'api/auth/account')
}

function isExistUsername (username) {
  return axios.head(process.env.REST_SERVER + 'api/auth/username/exist/' + username)
}
