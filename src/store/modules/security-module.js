import authService from '../../services/auth-service'

const user = JSON.parse(localStorage.getItem('user'))

const state = user ? { status: { authenticated: true }, user: user } : { status: {}, user: null }

const mutations = {
  signInSuccess (state, user) {
    state.authenticated = true
    state.user = user
  },
  signOutSuccess (state) {
    state.authenticated = false
    state.user = null
  }
}

const actions = {
  signIn ({ commit }, { signInForm }) {
    authService.signIn(signInForm)
      .then(
        user => {
          commit('signInSuccess', user)
        },
        error => {
          console.log(error)
        }
      )
  },
  signUp ({ commit }, { signUpForm }) {
    return authService.signUp(signUpForm)
  },
  signOut ({ commit }) {
    authService.signOut()
      .then(
        response => {
          commit('signOutSuccess')
        },
        error => {
          console.log(error)
        }
      )
  }
}

export default {
  state,
  mutations,
  actions
}
