import {
  SET_DRAWER,
  SET_PULL_TO_REFRESH_METHOD,
  SET_SHOW_SEARCH,
  SET_PULL_TO_LOAD_MORE_METHOD,
  REMOVE_PULL_TO_LOAD_MORE_METHOD,
  REMOVE_PULL_TO_REFRESH_METHOD
} from '../mutation-types'

const state = {
  drawer: false,
  pullToRefreshMethod: null,
  pullToLoadMoreMethod: null,
  showSearch: false,
  accountLoading: true
}

const mutations = {
  [SET_DRAWER] (state, drawer) {
    state.drawer = drawer
  },
  [SET_PULL_TO_REFRESH_METHOD] (state, method) {
    state.pullToRefreshMethod = method
  },
  [SET_SHOW_SEARCH] (state, payload) {
    state.showSearch = payload
  },
  [SET_PULL_TO_LOAD_MORE_METHOD] (state, method) {
    state.pullToLoadMoreMethod = method
  },
  [REMOVE_PULL_TO_LOAD_MORE_METHOD] (state) {
    state.pullToLoadMoreMethod = null
  },
  [REMOVE_PULL_TO_REFRESH_METHOD] (state) {
    state.pullToRefreshMethod = null
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
  },
  isShowSearch: state => {
    return state.showSearch
  }
}

export default {
  state,
  mutations,
  getters
}
