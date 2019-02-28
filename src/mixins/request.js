import { SET_REQUEST, CLEAR } from '../store/action-types'
import { mapGetters, mapActions } from 'vuex'
import { REQUEST } from '../config'

export default {
  computed: {
    ...mapGetters({
      'currentRequest': 'request/request'
    }),
    _isRequest (request) {
      return this.currentRequest === request
    },
    _isRestorePasswordRequest () {
      return this.currentRequest === REQUEST.RESTORE_PASSWORD
    },
    _isResendCodeRequest () {
      return this.currentRequest === REQUEST.RESEND_CODE
    },
    _isVerifyRequest () {
      return this.currentRequest === REQUEST.VERIFY
    },
    _isChangePasswordRequest () {
      return this.currentRequest === REQUEST.CHANGE_PASSWORD
    },
    _isConfirmSignUpRequest () {
      return this.currentRequest === REQUEST.CONFIRM_SIGN_UP
    },
    _isSignUpRequest () {
      return this.currentRequest === REQUEST.SIGN_UP
    },
    _isSignInRequest () {
      return this.currentRequest === REQUEST.SIGN_IN
    },
    _isSavePasswordRequest () {
      return this.request === REQUEST.SAVE_PASSWORD
    }
  },
  methods: {
    ...mapActions({
      'setRequest': 'request/' + SET_REQUEST,
      'clearRequest': 'request/' + CLEAR
    })
  },
  beforeDestroy () {
    this.clearRequest()
  }
}
