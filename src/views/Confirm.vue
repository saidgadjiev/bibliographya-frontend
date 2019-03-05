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
      this.$store.dispatch(CONFIRM_SIGN_UP, this.confirmForm.code)
        .then(
          () => {
            this.$router.push('/signIn')
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
