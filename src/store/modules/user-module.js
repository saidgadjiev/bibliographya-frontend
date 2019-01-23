import authService from '../../services/auth-service'

export const SIGN_IN_STATUS = {
  NOT_SIGNED_IN: 0,
  SIGNING_IN: 1,
  SIGNED_IN: 2,
  SIGN_IN_FAILURE: 3,
  SIGNED_OUT: 4
}

export const SIGN_UP_STATUS = {
  SIGNING_UP: 0,
  SIGNED_UP: 1
}

const state = { status: { notSignedIn: true }, user: {}, roles: [] }

const mutations = {
  signInSuccess (state, payload) {
    state.status = { signedIn: true }
    state.user = payload
  },
  signOutSuccess (state) {
    state.status = { signedOut: true }
    state.user = {}
    state.roles = {}
  },
  signInRequest (state) {
    state.status = { signingIn: true }
  },
  signInFailure (state) {
    state.status = { signInFailure: true }
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

    return new Promise((resolve, reject) => {
      authService.signIn(signInForm)
        .then(
          signInResponse => {
            commit('signInSuccess', signInResponse.data)
            resolve()
          },
          e => {
            commit('signInFailure')
            dispatch('alert/error', e)
            reject(e)
          }
        )
    })
  },
  socialSignIn ({ dispatch, commit }, payload) {
    commit('signInRequest')

    return new Promise((resolve, reject) => {
      authService.socialSignIn(payload.provider, payload.code)
        .then(
          signInResponse => {
            commit('signInSuccess', signInResponse.data)
            resolve()
          },
          e => {
            commit('signInFailure')
            dispatch('alert/error', e)
            reject(e)
          }
        )
    })
  },
  signUp ({ dispatch, commit }, signUpForm) {
    commit('signUpRequest')

    return new Promise((resolve, reject) => {
      authService.signUp(signUpForm)
        .then(
          response => {
            console.log('Success sign up ' + response.data)
            commit('signUpSuccess')
            resolve()
          },
          error => {
            commit('signUpFailure')
            dispatch('alert/error', error)
            reject(error)
          }
        )
    })
  },
  signOut ({ commit }) {
    return authService.signOut()
      .then(
        () => {
          commit('signOutSuccess')
        }
      )
  },
  getAccount ({ dispatch, commit }) {
    commit('signInRequest')

    authService.getAccount()
      .then(
        accountResponse => {
          commit('signInSuccess', accountResponse.data)
        },
        e => {
          commit('signUpFailure')
        }
      )
  }
}

const getters = {
  watchStatus: state => {
    return function () {
      return state.status
    }
  },
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

    roles.forEach(function (authorizedRole) {
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
