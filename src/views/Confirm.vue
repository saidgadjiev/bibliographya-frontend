<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <confirm-code
        :confirm="confirm"
        :request="Request.CONFIRM_SIGN_UP"
        :email="confirmForm.email"
        :code.sync="confirmForm.code"
        label="На вашу почту был отправлен код подтверждения регистрации."
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { CONFIRM_SIGN_UP } from '../store/action-types'
import { WELCOME_TITLE, WELCOME, SERVER_ERROR } from '../messages'
import ConfirmCode from '../components/auth/ConfirmCode'
import { mapGetters } from 'vuex'
import request from '../mixins/request'

export default {
  name: 'Confirm',
  mixins: [request],
  components: { ConfirmCode },
  data () {
    return {
      confirmForm: {
        email: '',
        code: ''
      }
    }
  },
  mounted () {
    this.confirmForm.email = this.getConfirmationEmail
  },
  computed: {
    ...mapGetters([
      'getConfirmationEmail'
    ])
  },
  methods: {
    confirm () {
      let that = this

      this.$store.dispatch(CONFIRM_SIGN_UP, this.confirmForm.code)
        .then(
          user => {
            that.$router.push('/')
            if (user.isNew) {
              that.$swal.fire({
                title: WELCOME_TITLE,
                text: WELCOME,
                type: 'info',
                showCloseButton: true
              })
            }
          },
          e => {
            if (e.response.status === this.HttpStatus.BAD_REQUEST) {
              that.$swal.fire({
                text: SERVER_ERROR,
                type: 'error',
                showCloseButton: true
              })
              that.$router.push('/')
            }
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
