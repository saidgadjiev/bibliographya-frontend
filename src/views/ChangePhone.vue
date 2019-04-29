<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
    <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Новый телефон</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>
    </v-stepper-header>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1" v-if="$vuetify.breakpoint.smAndDown">
      Новый телефон
    </v-stepper-step>

    <v-stepper-content step="1" v-if="$vuetify.breakpoint.smAndDown">
      <v-layout row justify-center align-center v-if="_isRequest(Request.LOADING_SETTINGS)">
        <progress-circular/>
      </v-layout>
      <step-one v-else :step.sync="step" :current-phone="currentPhone" @save-start="saveStart"/>
    </v-stepper-content>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2" v-if="$vuetify.breakpoint.smAndDown">
      Подтверждение
    </v-stepper-step>

    <v-stepper-content step="2" v-if="$vuetify.breakpoint.smAndDown">
      <confirm-code
        :code.sync="savePhoneForm.code"
        :request="Request.SAVE_PHONE"
        :label="'Мы отправили вам на телефон <strong>' + authKey + '</strong> СМС с кодом подтверждения. Вся процедура бесплатна.'"
        :confirm="savePhoneFinish"
        :time="time"
        :step="step"
      ></confirm-code>
    </v-stepper-content>

    <v-stepper-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-content step="1">
        <v-layout row justify-center align-center v-if="_isRequest(Request.LOADING_SETTINGS)">
            <progress-circular/>
        </v-layout>
        <step-one v-else :step.sync="step" :current-phone="currentPhone" @save-start="saveStart"/>
      </v-stepper-content>
      <v-stepper-content step="2">
        <confirm-code
          :code.sync="savePhoneForm.code"
          :request="Request.SAVE_PHONE"
          :label="'Мы отправили вам на телефон <strong>' + authKey + '</strong> СМС с кодом подтверждения. Вся процедура бесплатна.'"
          :confirm="savePhoneFinish"
          :time="time"
          :step="step"
        ></confirm-code>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import settingsService from '../services/settings-service'
import { PHONE_CHANGE_SUCCESS } from '../messages'
import ConfirmCode from '../components/auth/ConfirmCode'
import StepOne from '../components/auth/change/phone/StepOneChangePhone'
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'ChangeEmail',
  components: { ProgressCircular, StepOne, ConfirmCode },
  mixins: [alert, request],
  data () {
    return {
      step: 0,
      time: 0,
      authKey: '',
      currentPhone: '',
      savePhoneForm: {
        code: ''
      }
    }
  },
  created () {
    this.loadEmailSettings()
  },
  methods: {
    saveStart (e) {
      this.authKey = e.authKey
      this.time = e.timer.time
    },
    loadEmailSettings () {
      let that = this

      that.setRequest(that.Request.LOADING_SETTINGS)
      settingsService.getEmailSettings()
        .then(
          response => {
            that.currentPhone = response.data.phone
          }
        )
        .finally(() => {
          that.clearRequest()
        })
    },
    resetForm () {
      this.step = 1
      this.savePhoneForm.code = ''
    },
    savePhoneFinish () {
      let that = this

      that.setRequest(this.Request.SAVE_EMAIL)
      settingsService.savePhoneFinish(that.savePhoneForm)
        .then(
          () => {
            that.$swal.fire({
              text: PHONE_CHANGE_SUCCESS,
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
