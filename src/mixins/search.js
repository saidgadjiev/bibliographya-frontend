import { SET_SHOW_SEARCH } from '../store/mutation-types'
import EventBus, { SEARCH } from '../eventbus/eventbus'

export default {
  created () {
    this.$store.commit(SET_SHOW_SEARCH, true)
    EventBus.$on(SEARCH, this.doSearch)
  },
  beforeDestroy () {
    EventBus.$off(SEARCH)
    this.$store.commit(SET_SHOW_SEARCH, false)
  }
}
