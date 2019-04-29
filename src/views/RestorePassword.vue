<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
    <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Восстановление доступа</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" step="3">Новый пароль</v-stepper-step>
    </v-stepper-header>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1" v-if="$vuetify.breakpoint.smAndDown">
      Восстановление доступа
    </v-stepper-step>

    <v-stepper-content step="1" v-if="$vuetify.breakpoint.smAndDown">
      <step-one :step.sync="step" @restore-start="restoreStart"/>
    </v-stepper-content>

    <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2" v-if="$vuetify.breakpoint.smAndDown">
      Подтверждение
    </v-stepper-step>

    <v-stepper-content step="2" v-if="$vuetify.breakpoint.smAndDown">
      <confirm-code
        :request="Request.VERIFY"
        :time="time"
        :code.sync="restoreForm.code"
        :label="'Мы отправили вам на телефон <strong>' + authKey + '</strong> СМС с кодом подтверждения. Вся процедура бесплатна.'"
        :confirm="verify"
        :step="step"
      />
    </v-stepper-content>

    <v-stepper-step complete-icon="fas fa-check" step="3" v-if="$vuetify.breakpoint.smAndDown">Новый пароль</v-stepper-step>

    <v-stepper-content step="3" v-if="$vuetify.breakpoint.smAndDown">
      <step-three :code="restoreForm.code"/>
    </v-stepper-content>

    <v-stepper-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-content step="1">
        <step-one :step.sync="step" @restore-start="restoreStart"/>
      </v-stepper-content>

      <v-stepper-content step="2">
        <confirm-code
          :request="Request.VERIFY"
          :time="time"
          :code.sync="restoreForm.code"
          :label="'Мы отправили вам на телефон <strong>' + authKey + '</strong> СМС с кодом подтверждения. Вся процедура бесплатна.'"
          :confirm="verify"
          :step="step"
        />
      </v-stepper-content>

      <v-stepper-content step="3">
        <step-three :code="restoreForm.code"/>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import { REQUEST } from '../config'
import emailService from '../services/verification-service'
import ConfirmCode from '../components/auth/ConfirmCode'
import StepOne from '../components/auth/restore/password/StepOne'
import StepThree from '../components/auth/restore/password/StepThree'

export default {
  name: 'RestorePassword',
  components: { StepThree, StepOne, ConfirmCode },
  mixins: [alert, request],
  data () {
    return {
      step: 1,
      time: 0,
      authKey: '',
      restoreForm: {
        code: '',
        password: ''
      }
    }
  },
  methods: {
    resetForm () {
      this.step = 1
      this.restoreForm.code = ''
      this.restoreForm.verificationKey = ''
      this.restoreForm.password = ''
    },
    verify () {
      let that = this

      that.setRequest(REQUEST.VERIFY)

      emailService.verify(this.restoreForm.code)
        .then(
          () => {
            that.step = 3
          },
          e => {
            if (e.response.status === that.HttpStatus.PRECONDITION_FAILED) {
              that.setAlertError(e)
            }
          }
        ).finally(() => {
          that.clearRequest()
        })
    },
    restoreStart (e) {
      this.time = e.timer.time
      this.authKey = e.authKey
    }
  }
}
</script>

<style scoped>

</style>
