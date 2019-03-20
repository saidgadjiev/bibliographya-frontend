import { OPEN_DRAWER, HIDE_DRAWER } from '../mutation-types'
import { OPEN_OR_HIDE_DRAWER } from '../action-types'

const state = {
  drawer: false
}

const mutations = {
  [OPEN_DRAWER] (state) {
    state.drawer = true
  },
  [HIDE_DRAWER] (state) {
    state.drawer = false
  }
}

const actions = {
  [OPEN_OR_HIDE_DRAWER] ({ commit, state }) {
    if (state.drawer) {
      commit(HIDE_DRAWER)
    } else {
      commit(OPEN_DRAWER)
    }
  }
}

const getters = {
  isDrawerOpened: state => {
    return state.drawer
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
