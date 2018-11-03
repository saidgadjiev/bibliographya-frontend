import biographyService from '../../services/biography-service'

const state = {biographies: []}

const mutations = {
  addBiography (state, payload) {
    let biography = state.biographies.find(biography => biography.id === payload.id)

    if (biography) {
      biography.firstName = payload.firstName
      biography.lastName = payload.lastName
      biography.middleName = payload.middleName
      biography.biography = payload.biography
    } else {
      state.biographies.push(payload)
    }
  },
  updateFioById (state, payload) {
    let biography = state.biographies.find(biography => biography.id === payload.id)

    if (biography) {
      biography.firstName = payload.firstName
      biography.lastName = payload.lastName
      biography.middleName = payload.middleName
    }
  },
  updateBiographyById (state, payload) {
    let biography = state.biographies.find(biography => biography.id === payload.id)

    if (biography) {
      biography.biography = payload.biography
    }
  }
}

const actions = {
  addBiography ({ commit }, payload) {
    commit('addBiography', payload)
  },
  updateFioById ({ commit }, payload) {
    commit('updateFioById', payload)

    return Promise.resolve()
  },
  updateBiographyById ({ commit }, payload) {
    commit('updateBiographyById', payload)

    return Promise.resolve()
  },
  getOrLoadBiography ({ commit, getters }, username) {
    let biography = getters.getBiographyByUsername(username)

    if (biography) {
      return Promise.resolve(biography)
    }
    return new Promise((resolve, reject) => {
      biographyService.getBiographyByUsername(username)
        .then(
          response => {
            commit('addBiography', response.data)
            resolve(response)
          }, e => {
            reject(e)
          }
        )
    })
  }
}

const getters = {
  getBiographyByUsername: state => username => {
    return state.biographies.find(biography => biography.userName === username)
  },
  getBiographyById: state => id => {
    return state.biographies.find(biography => biography.id === id)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
