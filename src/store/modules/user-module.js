import authService from '../../services/auth-service'
import { REQUEST } from '../../config'
import { PRECONDITION_REQUIRED, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, CLEAR } from '../mutation-types'
import {
  CANCEL_SIGN_UP,
  CONFIRM_SIGN_UP,
  ERROR_SOCIAL_SIGN_IN,
  GET_ACCOUNT,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SOCIAL_SIGN_IN,
  SET_REQUEST,
  CLEAR
} from '../action-types'

export const USER_STATE = {
  NONE: -1,
  SIGNED_ID: 0,
  ANONYMOUS: 1
}

const state = { status: { state: USER_STATE.NONE }, user: {}, roles: [] }

const mutations = {
  [SIGN_IN_SUCCESS] (state, payload) {
    state.status.state = USER_STATE.SIGNED_ID
    state.user = payload
    state.roles = payload.authorities.map(function (authority) {
      return authority.authority
    })
  },
  [SIGN_OUT_SUCCESS] (state) {
    state.status.state = USER_STATE.ANONYMOUS
    state.user = {}
    state.roles = {}
  },
  [PRECONDITION_REQUIRED] (state, payload) {
    state.status.signUpForm = { email: payload.email }
  }
}

const actions = {
  [SIGN_IN] ({ dispatch, commit }, signInForm) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_IN)

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
        .finally(() => {
          dispatch('request/' + CLEAR)
        })
    })
  },
  [SOCIAL_SIGN_IN] ({ dispatch, commit }, payload) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_IN)

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
        .finally(() => {
          dispatch('request/' + CLEAR)
        })
    })
  },
  [ERROR_SOCIAL_SIGN_IN] ({ dispatch, commit }, payload) {
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
  [CONFIRM_SIGN_UP] ({ dispatch, commit }, code) {
    dispatch('request/' + SET_REQUEST, REQUEST.CONFIRM_SIGN_UP)

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
        .finally(() => {
          dispatch('request/' + CLEAR)
        })
    })
  },
  [CANCEL_SIGN_UP] ({ commit }) {
    authService.cancelSignUp()
      .then(
        () => {
          commit('signOutSuccess')
        }
      )
  },
  [SIGN_UP] ({ dispatch, commit }, signUpForm) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_UP)

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
        .finally(() => {
          dispatch('request/' + CLEAR)
        })
    })
  },
  [SIGN_OUT] ({ commit }) {
    return authService.signOut()
      .then(
        () => {
          commit('signOutSuccess')
        }
      )
  },
  [GET_ACCOUNT] ({ dispatch, commit }) {
    dispatch('request/' + SET_REQUEST, REQUEST.GET_ACCOUNT)

    authService.getAccount()
      .then(
        accountResponse => {
          commit('signInSuccess', accountResponse.data)
        },
        e => {
          if (e.response.status === 428) {
            dispatch('alert/error', e)
            commit('preconditionRequired', e.response.data)
          }

          commit('signOutSuccess')
        }
      )
      .finally(() => {
        dispatch('request/' + CLEAR)
      })
  }
}

const getters = {
  watchStatus: state => {
    return function () {
      return state.status
    }
  },
  getStatus: state => {
    return state.status
  },
  isAuthenticated: state => {
    return state.status.state === USER_STATE.SIGNED_ID
  },
  getUser: state => {
    return state.user
  },
  getUserAccount:(state, getters) => {
    return getters.getUser.userAccount
  },
  getUserId: (state, getters) => {
    return getters.getUser.id
  },
  getBiography: (state, getters) => {
    return getters.getUser.biography
  },
  getEmail: (state, getters) => {
    return getters.getUserAccount.email
  },
  getFirstName: (state, getters) => {
    return getters.getBiography.firstName
  },
  getLastName: (state, getters) => {
    return getters.getBiography.lastName
  },
  getMiddleName: (state, getters) => {
    return getters.getBiography.middleName
  },
  getBiographyId: (state, getters) => {
    return getters.getBiography.id
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
