import authService from '../../services/auth-service'
import biographyService from '../../services/biography-service'

const state = { status: { code: 200, message: null }, authenticated: false, user: null, biography: null, roles: null }

const mutations = {
  updateFioSuccess (state, payload) {
    state.biography.firstName = payload.firstName
    state.biography.lastName = payload.lastName
    state.biography.middleName = payload.middleName
  },
  updateBiographySuccess (state, payload) {
    state.biography.biography = payload.biography
  },
  signInSuccess (state, payload) {
    state.authenticated = true
    state.user = payload.user
    state.biography = payload.biography
  },
  signOutSuccess (state) {
    state.authenticated = false
    state.user = null
    state.biography = null
  },
  signInStatus (state, payload) {
    state.status.code = payload.status
    state.status.message = payload.message
  }
}

const actions = {
  signIn ({ commit }, signInForm) {
    return new Promise((resolve, reject) => {
      authService.signIn(signInForm)
        .then(
          signInResponse => {
            if (signInResponse.status !== 200) {
              commit('signInStatus', {
                status: signInResponse.status
              })
              throw new Error(signInResponse.status)
            }

            return signInResponse.data
          }
        ).then(
          user => {
            return new Promise((resolve, reject) => {
              biographyService.getBiographyByUsername(user.username)
                .then(
                  biographyResponse => {
                    if (biographyResponse.status !== 200) {
                      commit('signInStatus', {
                        status: biographyResponse.status
                      })
                      throw new Error(biographyResponse.status)
                    }

                    resolve({
                      user: user,
                      biography: biographyResponse.data
                    })
                  },
                  e => {
                    reject(e)
                  }
                )
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
          commit('signInStatus', {
            status: e.response.status
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
  getAccount ({commit}) {
    return new Promise((resolve, reject) => {
      authService.getAccount()
        .then(
          accountResponse => {
            if (accountResponse.status !== 200) {
              commit('signInStatus', {
                status: accountResponse.status
              })
              throw new Error(accountResponse.status)
            }

            return accountResponse.data
          }
        ).then(
          user => {
            return new Promise((resolve, reject) => {
              biographyService.getBiographyByUsername(user.username)
                .then(
                  biographyResponse => {
                    if (biographyResponse.status !== 200) {
                      commit('signInStatus', {
                        status: biographyResponse.status
                      })
                      throw new Error(biographyResponse.status)
                    }

                    resolve({
                      user: user,
                      biography: biographyResponse.data
                    })
                  },
                  e => {
                    reject(e)
                  }
                )
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
  },
  updateFio ({ commit }, payload) {
    commit('updateFioSuccess', payload)

    return Promise.resolve()
  },
  updateBiography ({ commit }, payload) {
    commit('updateBiographySuccess', payload)

    return Promise.resolve()
  }
}

const getters = {
  signInStatusCode: state => {
    return state.status.code
  },
  isAuthenticated: state => {
    return state.authenticated
  },
  firstName: state => {
    return state.biography ? state.biography.firstName : null
  },
  lastName: state => {
    return state.biography ? state.biography.lastName : null
  },
  middleName: state => {
    return state.biography ? state.biography.middleName : null
  },
  biography: state => {
    return state.biography ? state.biography.biography : null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
