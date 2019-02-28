import { SET_REQUEST as SET_REQUEST_MUTATION, CLEAR as CLEAR_MUTATION } from '../mutation-types'
import { SET_REQUEST, CLEAR } from '../action-types'

const REQUEST = {
  NONE: -1
}

const state = {
  request: REQUEST.NONE
}

const mutations = {
  [SET_REQUEST_MUTATION] (state, request) {
    state.request = request
  },
  [CLEAR_MUTATION] (state) {
    state.request = REQUEST.NONE
  }
}

const actions = {
  [SET_REQUEST] (state, request) {
    state.request = request
  },
  [CLEAR] (state) {
    state.request = REQUEST.NONE
  }
}

const getters = {
  request: state => state.request
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
