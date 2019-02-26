import authService from '../../services/auth-service'

const state = { status: { gettingAccount: true }, user: {}, roles: [] }

const mutations = {
  signInSuccess (state, payload) {
    state.status = { signedIn: true }
    state.user = payload
    state.roles = payload.authorities.map(function (authority) {
      return authority.authority
    })
  },
  signOutSuccess (state) {
    state.status = { anonymous: true }
    state.user = {}
    state.roles = {}
  },
  signInRequest (state) {
    state.status = { signInRequest: true }
  },
  signInFailure (state) {
    state.status = { signInRequestFailure: true }
    state.user = {}
    state.roles = {}
  },
  preconditionRequired (state, payload) {
    state.status = { preconditionRequired: true, signUpForm: { email: payload.email } }
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
      authService.socialSignIn(payload.provider, payload.redirectUri, payload.code)
        .then(
          signInResponse => {
            commit('signInSuccess', signInResponse.data)
            resolve(signInResponse.data)
          },
          e => {
            commit('signInFailure')
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
            console.log('Success confirm ' + response.data)
            resolve()
          },
          e => {
            dispatch('alert/error', e)
            reject(e)
          }
        )
    })
  },
  cancelSignUp () {
    authService.cancelSignUp()
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
