const state = {
  /**
   * Key to set in sessionStorage
   * @type {String}
   */
  _storageKey: 'vue.router.back.button.history',

  /**
   * Fallback if sessionStorage is not available
   * @type {Array}
   */
  _history: [],

  /**
   * Current path
   * @type {Integer}
   */
  _current: -1,

  /**
   * Check if sessionStorage is available
   */
  useSession: window.sessionStorage ? 1 : 0,

  /**
   * Ignore navigation to a route with the same name
   */
  ignoreRoutesWithSameName: false,

  rootRoutes: []
}

if (state.useSession) {
  const session = sessionStorage.getItem(state._storageKey)

  if (!session) {
    state._history = []
    state._current = -1
  } else {
    state._history = window.JSON.parse(session).history
    state._current = window.JSON.parse(session).current
  }
}

const mutations = {
  reset (state) {
    state._history = []
    state._current = -1
  },
  push (state, path) {
    state._history.push(path)
    state._current += 1
  },
  back (state, amount) {
    state._current -= amount
  },
  forward (state, amount) {
    state._current += amount
  },
  rootRoutes (state, routes) {
    state.rootRoutes = routes
  }
}

const actions = {
  reset ({ dispatch, commit }) {
    commit('reset')
    dispatch('save')
  },
  save () {
    if (state.useSession) {
      const session = window.JSON.stringify({
        history: state._history,
        current: state._current
      })

      sessionStorage.setItem(state._storageKey, session)
    }
  },
  clear ({ dispatch, commit }) {
    commit('reset')
    dispatch('save')
  },
  push ({ dispatch, commit, getters }, path) {
    let history = getters.getHistory
    let current = getters.getCurrent

    history.splice(current + 1, history.length)

    const currentPath = history[history.length - 1]

    if (currentPath !== path) {
      commit('push', path)
    }
  },
  back ({ dispatch, commit }, amount) {
    if (amount < 0) {
      return
    }

    commit('back', amount)
    dispatch('save')
  },
  forward ({ dispatch, commit }, amount) {
    if (amount < 0) {
      return
    }

    commit('forward', amount)
    dispatch('save')
  }
}

const getters = {
  getHistory: state => {
    return state._history
  },
  getCurrent: state => {
    return state._current
  },
  previous: (state, getters) => {
    const history = getters.getHistory

    if (history.length > 1) {
      return { path: history[getters.getCurrent - 1] }
    }

    return { path: null }
  },
  current: (state, getters) => {
    const history = getters.getHistory

    if (history.length > 1) {
      return { path: history[getters.getCurrent] }
    }

    return { path: null }
  },
  next: (state, getters) => {
    const history = getters.getHistory

    if (history.length + 1 > state._current) {
      return { path: history[state._current + 1] }
    }

    return { path: null }
  },
  hasHistory: (state, getters) => {
    const history = getters.getHistory

    return history.length > 1
  },
  hasPrevious: (state, getters) => {
    const current = getters.getCurrent

    return current > 0
  },
  hasForward: (state, getters) => {
    const current = getters.getCurrent
    const history = getters.getHistory

    return current + 1 < history.length
  },
  getTheRecentFuture: (state, getters) => {
    const history = getters.getHistory
    const current = getters.getCurrent

    return history.slice(current + 1, current + 4)
  },
  howFarIntheFuture: (state, getters) => path => {
    const future = getters.getTheRecentFuture

    return future.indexOf(path) + 1
  },
  isInTheFuture: (state, getters) => path => {
    return getters.howFarIntheFuture(path) > 0
  },
  indexOfRecentHistory: (state, getters) => path => {
    const history = getters.getHistory
    const current = getters.getCurrent

    const recentHistory = history.slice(0, current + 1).reverse()

    return recentHistory.indexOf(path)
  },
  visitedRecently: (state, getters) => path => {
    const index = getters.indexOfRecentHistory(path)

    return index !== -1
  },
  ignoreRoutesWithSameName: (state) => {
    return state.ignoreRoutesWithSameName
  },
  rootRoutes: state => {
    return state.rootRoutes
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
