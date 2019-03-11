<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
    <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Почта</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Пароль</v-stepper-step>
    </v-stepper-header>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1" v-if="$vuetify.breakpoint.smAndDown">
      Изменение
    </v-stepper-step>

    <v-stepper-content step="1" v-if="$vuetify.breakpoint.smAndDown">
      <v-layout row justify-center align-center v-if="_isRequest(Request.LOADING_EMAIL_SETTINGS)">
        <v-flex shrink>
          <progress-circular/>
        </v-flex>
      </v-layout>
      <step-one v-else :step.sync="step" :email.sync="saveEmailForm.email" :current-email="currentEmail"/>
    </v-stepper-content>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2" v-if="$vuetify.breakpoint.smAndDown">
      Подтверждение
    </v-stepper-step>

    <v-stepper-content step="2" v-if="$vuetify.breakpoint.smAndDown">
      <confirm-code
        :confirm="confirm"
        :request="Request.CONFIRM_SIGN_UP_START"
        :email="confirmForm.email"
        :code.sync="confirmForm.code"
        label="На вашу почту был отправлен код подтверждения регистрации."
      />
    </v-stepper-content>

    <v-stepper-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-content step="1">
        <v-layout row justify-center align-center v-if="_isRequest(Request.LOADING_EMAIL_SETTINGS)">
          <v-flex shrink>
            <progress-circular/>
          </v-flex>
        </v-layout>
        <step-one v-else :step.sync="step" :email.sync="saveEmailForm.email" :current-email="currentEmail"/>
      </v-stepper-content>
      <v-stepper-content step="2">
        <confirm-code
          :confirm="confirm"
          :request="Request.CONFIRM_SIGN_UP_START"
          :email="confirmForm.email"
          :code.sync="confirmForm.code"
          label="На вашу почту был отправлен код подтверждения регистрации."
        />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
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
