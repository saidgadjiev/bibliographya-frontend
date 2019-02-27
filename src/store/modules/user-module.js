import authService from '../../services/auth-service'

const USER_STATE = {
  SIGNED_ID: 0,
  ANONYMOUS: 1
}

const REQUEST = {
  NONE: -1,
  SIGN_IN: 0,
  SIGN_UP: 1,
  GET_ACCOUNT: 2
}

const state = { status: { state: USER_STATE.ANONYMOUS }, user: {}, roles: [] }

const mutations = {
  signInSuccess (state, payload) {
    state.status.state = USER_STATE.SIGNED_ID
    state.user = payload
    state.roles = payload.authorities.map(function (authority) {
      return authority.authority
    })
  },
  signOutSuccess (state) {
    state.status.state = USER_STATE.ANONYMOUS
    state.user = {}
    state.roles = {}
  },
  preconditionRequired (state, payload) {
    state.status = { signUpForm: { email: payload.email } }
  }
}

const actions = {
  signIn ({ dispatch, commit }, signInForm) {
    dispatch('request', REQUEST.SIGN_IN)

    return new Promise((resolve, reject) => {
      authService.signIn(signInForm)
        .then(
          signInResponse => {
            commit('signInSuccess', signInResponse.data)
            resolve()
          },
          e => {
            dispatch('alert/error', e)
            reject(e)
          }
        )
    })
  },
  socialSignIn ({ dispatch, commit }, payload) {
    dispatch('request', REQUEST.SIGN_IN)

    return new Promise((resolve, reject) => {
      authService.socialSignIn(payload.provider, payload.redirectUri, payload.code)
        .then(
          signInResponse => {
            commit('signInSuccess', signInResponse.data)
            resolve(signInResponse.data)
          },
          e => {
            dispatch('alert/error', e)
            reject(e)
          }
        )
    })
  },
  errorSocialSignIn ({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      authService.errorSocialSignIn(payload.provider, payload.code, payload.errorDescription)
        .then(
          response => {
            resolve(response)
          },
          e => {
            reject(e)
          }
        )
    })
  },
  confirmSignUp ({ dispatch, commit }, code) {
    return new Promise((resolve, reject) => {
      authService.confirmSignUp(code)
        .then(
          response => {
            resolve()
          },
          e => {
            dispatch('alert/error', e)
            reject(e)
          }
        )
    })
  },
  cancelSignUp ({ commit }) {
    authService.cancelSignUp()
      .then(
        () => {
          commit('signOutSuccess')
        }
      )
  },
  signUp ({ dispatch, commit }, signUpForm) {
    return new Promise((resolve, reject) => {
      authService.signUp(signUpForm)
        .then(
          response => {
            console.log('Success sign up ' + response.data)
            resolve()
          },
          error => {
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
    authService.getAccount()
      .then(
        accountResponse => {
          commit('signInSuccess', accountResponse.data)
        },
        e => {
          if (e.response.status === 428) {
            commit('preconditionRequired', e.response.data)
          } else {
            commit('signOutSuccess')
          }
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
