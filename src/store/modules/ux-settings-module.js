import { SET_DRAWER, SET_PULL_TO_REFRESH_METHOD, SET_PULL_TO_LOAD_MORE_METHOD } from '../mutation-types'

const state = {
  drawer: false,
  pullToRefreshMethod: null,
  pullToLoadMoreMethod: null
}

const mutations = {
  [SET_DRAWER] (state, drawer) {
    state.drawer = drawer
  },
  [SET_PULL_TO_REFRESH_METHOD] (state, method) {
    state.pullToRefreshMethod = method
  },
  [SET_PULL_TO_LOAD_MORE_METHOD] (state, method) {
    state.pullToLoadMoreMethod = method
  }
}

const getters = {
  drawer: state => {
    return state.drawer
  },
  pullToRefreshMethod: state => {
    return state.pullToRefreshMethod
  },
  pullToLoadMoreMethod: state => {
    return state.pullToLoadMoreMethod
  }
}

export default {
  state,
  mutations,
  getters
}
