import authService from '../../services/auth-service'

const state = { status: { signedIn: false }, user: {}, roles: [] }

const mutations = {
  signInSuccess (state, payload) {
    state.status = { signedIn: true }
    state.user = payload
  },
  signOutSuccess (state) {
    state.status = { signedIn: false }
    state.user = {}
    state.roles = {}
  },
  signInRequest (state) {
    state.status = { signingIn: true }
  },
  signInFailure (state) {
    state.status = {}
    state.user = {}
    state.roles = {}
  },
  signUpSuccess (state) {
    state.status = { signedUp: true }
  },
  signUpRequest (state) {
    state.status = { signingUp: true }
  },
  signUpFailure (state) {
    state.status = {}
  }
}

const actions = {
  signIn ({ dispatch, commit }, signInForm) {
    commit('signInRequest')

    return authService.signIn(signInForm)
      .then(
        signInResponse => {
          commit('signInSuccess', signInResponse.data)
        },
        e => {
          commit('signInFailure')
          dispatch('alert/error', e)
        }
      )
  },
  signUp ({ dispatch, commit }, signUpForm) {
    commit('signUpRequest')

    authService.signUp(signUpForm)
      .then(
        response => {
          console.log('Success sign up ' + response.data)
          commit('signUpSuccess')
        },
        error => {
          commit('signUpFailure')
          dispatch('alert/error', error)
        }
      )
  },
  signOut ({ commit }) {
    authService.signOut()
      .then(
        () => {
          commit('signOutSuccess')
        }
      )
  },
  getAccount ({ dispatch, commit }) {
    authService.getAccount()
      .then(
        accountResponse => {
          commit('signInSuccess', accountResponse.data)
        },
        e => {
          console.log(e)
        }
      )
  }
}

const getters = {
  status: state => {
    return state.status
  },
  isAuthenticated: state => {
    return state.status.signedIn
  },
  getUser: state => {
    return state.user
  },
  isAuthorized: (state, getters) => roles => {
    if (!getters.isAuthenticated) {
      return false
    }
    if (roles === '*') {
      return true
    }
    let isAuthorized = false

    state.roles.forEach(function (authorizedRole) {
      if (isAuthorized) {
        return
      }
      if (authorizedRole === '*') {
        isAuthorized = true
      } else {
        isAuthorized = state.roles.indexOf(authorizedRole) !== -1
      }
    })

    return isAuthorized
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
