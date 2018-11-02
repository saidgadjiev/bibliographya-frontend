import authService from '../../services/auth-service'

const state = { status: { code: 200, message: null }, authenticated: false, user: {}, roles: [] }

const mutations = {
  signInSuccess (state, payload) {
    state.authenticated = true
    state.user = payload
  },
  signOutSuccess (state) {
    state.authenticated = false
    state.user = null
  },
  signInStatus (state, payload) {
    state.status.code = payload.status
    state.status.message = payload.message
  }
}

const actions = {
  signIn ({ dispatch, commit }, signInForm) {
    return new Promise((resolve, reject) => {
      authService.signIn(signInForm)
        .then(
          signInResponse => {
            return signInResponse.data
          }
        ).then(
          user => {
            return dispatch('getOrLoadBiography', user.username)
              .then(
                () => {
                  commit('signInSuccess', user)
                  commit('signInStatus', {
                    status: 200
                  })
                  resolve()
                },
                e => {
                  reject(e)
                })
          }).catch(e => {
          console.log(e)
          commit('signInStatus', {
            status: e.response ? e.response.status : 500
          })
          reject(e)
        })
    })
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
  },
  getAccount ({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      authService.getAccount()
        .then(
          accountResponse => {
            return accountResponse.data
          }
        ).then(
          user => {
            return new Promise((resolve, reject) => {
              dispatch('getOrLoadBiography', user.username)
                .then(
                  () => {
                    resolve(user)
                  },
                  e => {
                    reject(e)
                  })
            })
          }
        ).then(
          response => {
            commit('signInSuccess', response)
            commit('signInStatus', {
              status: 200
            })
            resolve()
          }
        )
        .catch(e => {
          console.log(e)
          reject(e)
        })
    })
  }
}

const getters = {
  signInStatusCode: state => {
    return state.status.code
  },
  isAuthenticated: state => {
    return state.authenticated
  },
  getUsername: state => {
    return state.user ? state.user.username : null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
