export default {
  signIn
}

function signIn (username, password) {
  let json = {
    username: username,
    password: password
  }

  return this.$http.post(process.env.REST_SERVER + 'api/auth/signIn', json)
}
