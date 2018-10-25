export default {
  signIn,
  signUp,
  signOut
}

function signIn (signInForm) {
  let json = {
    username: signInForm.username,
    password: signInForm.password
  }

  return this.$http.post(process.env.REST_SERVER + 'api/auth/signIn', json)
}

function signUp (signUpForm) {
  let json = {
    username: signUpForm.username,
    password: signUpForm.password,
    fistName: signUpForm.fistName,
    lastName: signUpForm.lastName,
    middleName: signUpForm.middleName
  }

  return this.$http.post(process.env.REST_SERVER + 'api/auth/signUp', json)
}

function signOut () {
  return this.$http.signOut(process.env.REST_SERVER + 'api/auth/signOut')
}
