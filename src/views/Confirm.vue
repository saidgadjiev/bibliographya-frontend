<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <confirm-code
        :confirm="confirm"
        :email="confirmForm.email"
        :code.sync="confirmForm.code"
        label="На вашу почту был отправлен код подтверждения регистрации."
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { CONFIRM_SIGN_UP } from '../store/action-types'
import { WELCOME_TITLE, WELCOME } from '../messages'
import ConfirmCode from '../components/auth/ConfirmCode'

export default {
  name: 'Confirm',
  components: { ConfirmCode },
  data () {
    return {
      confirmForm: {
        email: '',
        code: ''
      }
    }
  },
  created () {
    this.confirmForm.email = this.alertError.response.data.email
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
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
