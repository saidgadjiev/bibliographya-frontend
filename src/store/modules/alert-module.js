const state = {
  type: null,
  message: null
}

const actions = {
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, message) {
    commit('error', message)
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
  error (state, message) {
    state.type = 'alert-danger'
    state.message = message
  },
  clear (state, message) {
    state.type = null
    state.message = null
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
