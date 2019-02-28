import { SET_SUCCESS, SET_ERROR, CLEAR } from '../store/action-types'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      'alertType': 'alert/type',
      'alertError': 'alert/error'
    }),
    _isError (status) {
      return this.alertError.response.status === status
    },
    _isConflictError () {
      return this.alertError.response.status === 409
    },
    _isNotFoundError () {
      return this.alertError.response.status === 404
    },
    _isBadRequestError () {
      return this.alertError.response.status === 400
    },
    _isPreconditionFailedError () {
      return this.alertError.response.status === 412
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
