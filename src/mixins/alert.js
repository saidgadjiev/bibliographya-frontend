import { SET_SUCCESS, SET_ERROR, CLEAR } from '../store/action-types'
import { mapGetters, mapActions } from 'vuex'
const HttpStatus = require('http-status-codes')

export default {
  data () {
    return {
      HttpStatus: HttpStatus
    }
  },
  computed: {
    ...mapGetters({
      'alertType': 'alert/type',
      'alertError': 'alert/error',
      'alertMessage': 'alert/message'
    }),
    _isError (status) {
      return this.alertError.response.status === status
    }
  },
  methods: {
    ...mapActions({
      'setAlertSuccess': 'alert/' + SET_SUCCESS,
      'setAlertError': 'alert/' + SET_ERROR,
      'clearAlert': 'alert/' + CLEAR
    })
  },
  beforeDestroy () {
    this.clearAlert()
  }
}
