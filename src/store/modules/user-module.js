import authService from '../../services/auth-service'
import { REQUEST, TOKEN_NAME, isMobilePlatform } from '../../config'
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_CONFIRMATION, REMOVE_CONFIRMATION } from '../mutation-types'
import {
  CANCEL_SIGN_UP,
  CONFIRM_SIGN_UP,
  ERROR_SOCIAL_SIGN_UP,
  GET_ACCOUNT,
  GET_CONFIRMATION,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SOCIAL_SIGN_UP,
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

const state = { status: USER_STATE.NONE, user: {}, confirmation: false, roles: [] }

const mutations = {
  [SIGN_IN_SUCCESS] (state, payload) {
    state.status = USER_STATE.SIGNED_ID
    state.user = payload.user
    state.roles = payload.user.authorities.map(function (authority) {
      return authority.authority
    })
    localStorage.setItem(TOKEN_NAME, payload.token)
  },
  [SIGN_OUT_SUCCESS] (state) {
    state.status = USER_STATE.ANONYMOUS
    state.user = {}
    state.roles = {}
    localStorage.removeItem(TOKEN_NAME)
  },
  [SET_CONFIRMATION] (state) {
    state.confirmation = true
  },
  [REMOVE_CONFIRMATION] (state) {
    state.confirmation = false
  }
}

const actions = {
  [SIGN_IN] ({ dispatch, commit }, signInForm) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_IN)

    return new Promise((resolve, reject) => {
      authService.signIn(signInForm)
        .then(
          signInResponse => {
            if (isMobilePlatform()) {
              let token = signInResponse.headers[TOKEN_NAME]

              if (token) {
                commit(SIGN_IN_SUCCESS, {
                  user: signInResponse.data,
                  token: token
                })
              } else {
                reject(new Error('Token is not present'))
              }
            } else {
              commit(SIGN_IN_SUCCESS, {
                user: signInResponse.data
              })
            }

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
  [SOCIAL_SIGN_UP] ({ dispatch, commit }, payload) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_UP)

    return new Promise((resolve, reject) => {
      authService.socialSignUp(payload.provider, payload.redirectUri, payload.code)
        .then(
          response => {
            resolve(response)
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
  [ERROR_SOCIAL_SIGN_UP] ({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      authService.errorSocialSignUp(payload.provider, payload.code, payload.errorDescription)
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
  [CONFIRM_SIGN_UP] ({ dispatch, commit }, confirmSignUp) {
    dispatch('request/' + SET_REQUEST, REQUEST.CONFIRM_SIGN_UP_FINISH)

    return new Promise((resolve, reject) => {
      authService.confirmSignUpFinish(confirmSignUp)
        .then(
          response => {
            if (isMobilePlatform()) {
              let token = response.headers[TOKEN_NAME]

              if (token) {
                commit(SIGN_IN_SUCCESS, {
                  user: response.data,
                  token: token
                })
              } else {
                reject(new Error('Token is not present'))
              }
            } else {
              commit(SIGN_IN_SUCCESS, {
                user: response.data
              })
            }

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
              commit(SET_CONFIRMATION)
            }

            resolve(response)
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
  [SIGN_OUT] ({ dispatch, commit }) {
    dispatch('request/' + SET_REQUEST, REQUEST.SIGN_OUT)

    return authService.signOut()
      .then(
        () => {
          commit(SIGN_OUT_SUCCESS)
        }
      ).finally(() => {
        dispatch('request/' + CLEAR)
      })
  },
  [GET_ACCOUNT] ({ dispatch, commit, getters }) {
    dispatch('request/' + SET_REQUEST, REQUEST.GET_ACCOUNT)

    authService.getAccount()
      .then(
        accountResponse => {
          if (isMobilePlatform()) {
            let token = getters.getToken

            commit(SIGN_IN_SUCCESS, {
              user: accountResponse.data,
              token: token
            })
          } else {
            commit(SIGN_IN_SUCCESS, {
              user: accountResponse.data
            })
          }
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
  getToken: () => {
    return localStorage.getItem(TOKEN_NAME)
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
