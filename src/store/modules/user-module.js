import authService from '../../services/auth-service'
import { REQUEST } from '../../config'
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_CONFIRMATION, REMOVE_CONFIRMATION } from '../mutation-types'
import {
  CANCEL_SIGN_UP,
  CONFIRM_SIGN_UP,
  ERROR_SOCIAL_SIGN_IN,
  GET_ACCOUNT,
  GET_CONFIRMATION,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SOCIAL_SIGN_IN,
  SET_REQUEST,
  CLEAR,
  SET_ERROR
} from '../action-types'

const HttpStatus = require('http-status-codes')

export const USER_STATE = {
  NONE: -1,
  SIGNED_ID: 0,
  ANONYMOUS: 1
}

const state = { status: USER_STATE.NONE, user: {}, confirmation: undefined, roles: [] }

const mutations = {
  [SIGN_IN_SUCCESS] (state, payload) {
    state.status = USER_STATE.SIGNED_ID
    state.user = payload
    state.roles = payload.authorities.map(function (authority) {
      return authority.authority
    })
  },
  [SIGN_OUT_SUCCESS] (state) {
    state.status = USER_STATE.ANONYMOUS
    state.user = {}
    state.roles = {}
  },
  [SET_CONFIRMATION] (state, payload) {
    state.confirmation = payload
  },
  [REMOVE_CONFIRMATION] (state) {
    state.confirmation = undefined
  }
}

const actions = {
  [SIGN_IN] ({ dispatch, commit }, signInForm) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_IN)

    return new Promise((resolve, reject) => {
      authService.signIn(signInForm)
        .then(
          signInResponse => {
            commit(SIGN_IN_SUCCESS, signInResponse.data)
            resolve()
          },
          e => {
            dispatch('alert/' + SET_ERROR, e)
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
            commit(SIGN_IN_SUCCESS, signInResponse.data)
            resolve(signInResponse.data)
          },
          e => {
            dispatch('alert/' + SET_ERROR, e)
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
            commit(SIGN_IN_SUCCESS, response.data)
            resolve(response.data)
          },
          e => {
            dispatch('alert/' + SET_ERROR, e)
            reject(e)
          }
        )
        .finally(() => {
          dispatch('request/' + CLEAR)
        })
    })
  },
  [GET_CONFIRMATION] ({ commit }) {
    return new Promise((resolve, reject) => {
      authService.getConfirmation()
        .then(
          response => {
            if (response.status === HttpStatus.OK) {
              commit(SET_CONFIRMATION, response.data)
            }

            resolve(response.data)
          },
          e => {
            reject(e)
          }
        )
    })
  },
  [CANCEL_SIGN_UP] ({ commit }) {
    authService.cancelSignUp()
      .then(
        () => {
          commit(REMOVE_CONFIRMATION)
        }
      )
  },
  [SIGN_UP] ({ dispatch, commit }, signUpForm) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_UP)

    return new Promise((resolve, reject) => {
      authService.signUp(signUpForm)
        .then(
          response => {
            resolve(response)
          },
          error => {
            dispatch('alert/' + SET_ERROR, error)
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
          commit(SIGN_OUT_SUCCESS)
        }
      )
  },
  [GET_ACCOUNT] ({ dispatch, commit }) {
    dispatch('request/' + SET_REQUEST, REQUEST.GET_ACCOUNT)

    authService.getAccount()
      .then(
        accountResponse => {
          commit(SIGN_IN_SUCCESS, accountResponse.data)
        },
        e => {
          commit(SIGN_OUT_SUCCESS)
        }
      )
      .finally(() => {
        dispatch('request/' + CLEAR)
      })
  }
}

const getters = {
  watchState: state => {
    return function () {
      return state.status
    }
  },
  getConfirmationEmail: state => {
    return state.confirmation.email
  },
  isConfirmation: state => {
    return state.confirmation
  },
  getStatus: state => {
    return state.status
  },
  isAuthenticated: state => {
    return state.status === USER_STATE.SIGNED_ID
  },
  getUser: state => {
    return state.user
  },
  getUserAccount: (state, getters) => {
    return getters.getUser.userAccount
  },
  getUserId: (state, getters) => {
    return getters.getUser.id
  },
  getBiography: (state, getters) => {
    return getters.getUser.biography
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
