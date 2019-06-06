import writeHistory from './writeHistory'
import store from '../../store/store'

export {
  writeHistory
}

export default {
  install (Vue, options = {}) {
    if (!options.router) {
      console.error('VueRouterBackButton: router is required on install')
      return
    }

    store.commit('rootRoutes', options.rootRoutes)
    options.router.afterEach(writeHistory)
  }
}
