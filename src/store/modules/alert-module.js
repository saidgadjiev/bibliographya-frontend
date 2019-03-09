import { SET_SUCCESS as SET_SUCCESS_MUTATION, SET_ERROR as SET_ERROR_MUTATION, CLEAR as CLEAR_MUTATION } from '../mutation-types'
import { SET_SUCCESS, SET_ERROR, CLEAR } from '../action-types'

const state = {
  type: null,
  message: null,
  error: null
}

const actions = {
  [SET_SUCCESS] ({ commit }, message) {
    commit(SET_SUCCESS_MUTATION, message)
  },
  [SET_ERROR] ({ commit }, error) {
    commit(SET_ERROR_MUTATION, error)
  },
  [CLEAR] ({ commit }, message) {
    commit(CLEAR_MUTATION, message)
  }
}

const mutations = {
  [SET_SUCCESS_MUTATION] (state, message) {
    state.type = 'alert-success'
    state.message = message
  },
  [SET_ERROR_MUTATION] (state, error) {
    state.type = 'alert-danger'
    state.error = error
  },
  [CLEAR_MUTATION] (state) {
    state.type = null
    state.message = null
    state.error = null
  }
}

const getters = {
  type: state => {
    return state.type
  },
  error: state => {
    return state.error
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
