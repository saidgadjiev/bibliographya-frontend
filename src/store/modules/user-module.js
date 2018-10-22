import authService from '../../services/auth-service'

const user = JSON.parse(localStorage.getItem('user'))

const state = user ? { status: { authenticated: true }, user: user } : { status: {}, user: null }

const mutations = {
  signInSuccess (state, user) {
    state.authenticated = true
    state.user = user
  }
}

const actions = {
  singIn ({ dispatch, commit }, { username, password }) {
    authService.singIn(username, password)
  }
}

export default {
  state,
  mutations,
  actions
}
