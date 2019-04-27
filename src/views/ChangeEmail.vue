<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
    <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Изменение</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>
    </v-stepper-header>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1" v-if="$vuetify.breakpoint.smAndDown">
      Изменение
    </v-stepper-step>

    <v-stepper-content step="1" v-if="$vuetify.breakpoint.smAndDown">
      <v-layout row justify-center align-center v-if="_isRequest(Request.LOADING_EMAIL_SETTINGS)">
          <progress-circular/>
      </v-layout>
      <step-one v-else :step.sync="step" :email.sync="saveEmailForm.email" :current-email="currentEmail"/>
    </v-stepper-content>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2" v-if="$vuetify.breakpoint.smAndDown">
      Подтверждение
    </v-stepper-step>

    <v-stepper-content step="2" v-if="$vuetify.breakpoint.smAndDown">
      <confirm-code
        :email="saveEmailForm.email"
        :code.sync="saveEmailForm.code"
        :request="Request.SAVE_EMAIL"
        label="Код подтверждения отправлен вам на почту."
        :confirm="saveEmail"
      ></confirm-code>
    </v-stepper-content>

    <v-stepper-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-content step="1">
        <v-layout row justify-center align-center v-if="_isRequest(Request.LOADING_EMAIL_SETTINGS)">
            <progress-circular/>
        </v-layout>
        <step-one v-else :step.sync="step" :email.sync="saveEmailForm.email" :current-email="currentEmail"/>
      </v-stepper-content>
      <v-stepper-content step="2">
        <confirm-code
          :email="saveEmailForm.email"
          :code.sync="saveEmailForm.code"
          :request="Request.SAVE_EMAIL"
          label="Код подтверждения отправлен вам на почту."
          :confirm="saveEmailFinish"
        ></confirm-code>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import settingsService from '../services/settings-service'
import { EMAIL_CHANGE_SUCCESS } from '../messages'
import ConfirmCode from '../components/auth/ConfirmCode'
import StepOne from '../components/auth/change/email/StepOneChangeEmail'
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'ChangeEmail',
  components: { ProgressCircular, StepOne, ConfirmCode },
  mixins: [alert, request],
  data () {
    return {
      step: 0,
      currentEmail: '',
      saveEmailForm: {
        email: '',
        code: ''
      }
    }
  },
  created () {
    this.loadEmailSettings()
  },
  methods: {
    loadEmailSettings () {
      let that = this

      that.setRequest(that.Request.LOADING_EMAIL_SETTINGS)
      settingsService.getEmailSettings()
        .then(
          response => {
            that.saveEmailForm.email = response.data.email
            that.currentEmail = response.data.email
          }
        )
        .finally(() => {
          that.clearRequest()
        })
    },
    resetForm () {
      this.step = 1
      this.saveEmailForm.email = ''
      this.saveEmailForm.code = ''
    },
    saveEmailFinish () {
      let that = this

      that.setRequest(this.Request.SAVE_EMAIL)
      settingsService.saveEmailFinish(that.saveEmailForm)
        .then(
          () => {
            that.$swal.fire({
              text: EMAIL_CHANGE_SUCCESS,
              type: 'info',
              showCloseButton: true
            })
            that.$router.push('/settings')
          },
          e => {
            if (e.response.status === this.HttpStatus.PRECONDITION_FAILED) {
              that.setAlertError(e)
            }
          }
        ).finally(() => {
          that.clearRequest()
        })
    }
  }
}
</script>

<style scoped>

</style>
