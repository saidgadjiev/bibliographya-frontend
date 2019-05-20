import routerHistory from './history'
import writeHistory from './writeHistory'

export {
  routerHistory,
  writeHistory
}

export default {
  install (Vue, options = {}) {
    if (!options.router) {
      console.error('VueRouterBackButton: router is required on install')
      return
    }

    Vue.use(routerHistory, options)
    options.router.afterEach(writeHistory)
  }
}
