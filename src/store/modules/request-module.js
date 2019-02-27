const REQUEST = {
  NONE: -1
}

const state = {
  request: REQUEST.NONE
}

const mutations = {
  request (state, request) {
    state.request = request
  },
  clear (state) {
    state.request = REQUEST.NONE
  }
}

const getters = {
  request: state => state.request
}

export default {
  state,
  getters,
  mutations
}
