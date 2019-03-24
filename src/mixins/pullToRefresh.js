import { SET_PULL_TO_REFRESH_METHOD, REMOVE_PULL_TO_REFRESH_METHOD } from '../store/mutation-types'
import { mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      'setPullToRefresh': SET_PULL_TO_REFRESH_METHOD,
      'removePullToRefresh': REMOVE_PULL_TO_REFRESH_METHOD
    })
  },
  computed: {
    ...mapGetters([
      'pullToRefreshMethod'
    ])
  },
  created () {
    this.setPullToRefresh(this.pullToRefresh)
  },
  beforeDestroy () {
    this.removePullToRefresh()
  }
}
