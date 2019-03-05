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
import ConfirmCode from '../components/auth/ConfirmCode'
export default {
  name: 'EmailConfirm',
  components: { ConfirmCode }
}
</script>

<style scoped>

</style>
