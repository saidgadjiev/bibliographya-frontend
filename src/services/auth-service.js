export default {
  signIn,
  signUp,
  signOut
}

function signIn (signInForm) {
  const axios = require('axios')

  let json = {
    username: signInForm.username,
    password: signInForm.password
  }

  return axios.post(process.env.REST_SERVER + 'api/auth/signIn', json)
}

function signUp (signUpForm) {
  const axios = require('axios')

  let json = {
    username: signUpForm.username,
    password: signUpForm.password,
    fistName: signUpForm.fistName,
    lastName: signUpForm.lastName,
    middleName: signUpForm.middleName
  }

  return axios.post(process.env.REST_SERVER + 'api/auth/signUp', json)
}

function signOut () {
  const axios = require('axios')

  return axios.post(process.env.REST_SERVER + 'api/auth/signOut')
}
