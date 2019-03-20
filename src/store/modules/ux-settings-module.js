import { SET_DRAWER } from '../mutation-types'

const state = {
  drawer: false
}

const mutations = {
  [SET_DRAWER] (state, drawer) {
    state.drawer = drawer
  }
}

const getters = {
  drawer: state => {
    return state.drawer
  }
}

export default {
  state,
  mutations,
  getters
}
