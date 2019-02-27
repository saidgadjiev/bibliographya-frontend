const state = {
  type: null,
  message: null,
  error: null
}

const actions = {
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, error) {
    commit('error', error)
  },
  clear ({ commit }, message) {
    commit('clear', message)
  }
}

const mutations = {
  success (state, message) {
    state.type = 'alert-success'
    state.message = message
  },
  error (state, error) {
    state.type = 'alert-danger'
    state.error = error
  },
  clear (state) {
    state.type = null
    state.message = null
    state.error = null
  }
}

const getters = {
  type: state => {
    return state.type
  },
  message: state => {
    return state.message
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
