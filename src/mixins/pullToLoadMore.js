import { SET_PULL_TO_LOAD_MORE_METHOD, REMOVE_PULL_TO_LOAD_MORE_METHOD } from '../store/mutation-types'
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      'setPullToLoadMore': SET_PULL_TO_LOAD_MORE_METHOD,
      'removePullToLoadMore': REMOVE_PULL_TO_LOAD_MORE_METHOD
    })
  },
  computed: {
    ...mapGetters([
      'pullToLoadMoreMethod'
    ])
  },
  created () {
    this.setPullToLoadMore(this.pullToLoadMore)
  },
  beforeDestroy () {
    this.removePullToLoadMore()
  }
}
