import authService from '../../services/auth-service'
import biographyService from '../../services/biography-service'

const state = { authenticated: false, biography: null, roles: null }

const mutations = {
  signInSuccess (state, biography) {
    state.authenticated = true
    state.biography = biography
  },
  signOutSuccess (state) {
    state.authenticated = false
    state.biography = null
  }
}

const actions = {
  signIn ({ commit }, signInForm) {
    authService.signIn(signInForm)
      .then(
        user => {
          biographyService.getBiographyByUsername(user.username)
            .then(
              biography => {
                commit('signInSuccess', biography)
              },
              error => {
                console.log(error)
              }
            )
        },
        error => {
          console.log(error)
        }
      )
  },
  signUp ({ commit }, signUpForm) {
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
