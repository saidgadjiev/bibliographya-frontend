import store from '../../store/store'

export default (to, from) => {
  if (store.getters.isInTheFuture(to.fullPath)) {
    const amount = store.getters.howFarIntheFuture(to.fullPath)

    store.dispatch('forward', amount)
  } else if (store.getters.visitedRecently(to.fullPath)) {
    const amount = store.getters.indexOfRecentHistory(to.fullPath)

    store.dispatch('back', amount)
  } else {
    /**
         * Ignore navigation to a route with the same name
         */
    if (store.getters.ignoreRoutesWithSameName && to.name && from.name && to.name === from.name) {
      return
    }

    /**
         * Save the new route
         */

    if (store.getters.rootRoutes.indexOf(to.name) !== -1) {
      store.dispatch('clear')
    }

    store.dispatch('push', to.fullPath)
  }
}
