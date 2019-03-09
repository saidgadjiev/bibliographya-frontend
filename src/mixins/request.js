import { SET_REQUEST, CLEAR } from '../store/action-types'
import { mapGetters, mapActions } from 'vuex'
import { REQUEST } from '../config'

export default {
  data () {
    return {
      Request: REQUEST
    }
  },
  computed: {
    ...mapGetters({
      'currentRequest': 'request/request'
    })
  },
  methods: {
    ...mapActions({
      'setRequest': 'request/' + SET_REQUEST,
      'clearRequest': 'request/' + CLEAR
    }),
    _isRequest (request) {
      return this.currentRequest === request
    }
  },
  beforeDestroy () {
    this.clearRequest()
  }
}
