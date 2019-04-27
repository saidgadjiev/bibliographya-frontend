<template>
  <v-layout row justify-center>
    <v-flex xs12 md8>
      <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
        <div class="pa-5 green lighten2 white--text">
          <h3>Пожалуйста не покидайте эту страницу, иначе придется проходить процедуру регистрации заново.</h3>
        </div>
        <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
          <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Подтверждение телефона</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Пароль</v-stepper-step>
        </v-stepper-header>

        <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1" v-if="$vuetify.breakpoint.smAndDown">
          Подтверждение телефона
        </v-stepper-step>
        <v-stepper-content step="1" v-if="$vuetify.breakpoint.smAndDown">
          <step-one :step.sync="step" :code.sync="confirmForm.code" :phone.sync="confirmForm.phone"/>
        </v-stepper-content>

        <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2" v-if="$vuetify.breakpoint.smAndDown">
          Пароль
        </v-stepper-step>

        <v-stepper-content step="2" v-if="$vuetify.breakpoint.smAndDown">
          <step-three :phone="confirmForm.phone" :code="confirmForm.code"/>
        </v-stepper-content>

        <v-stepper-items v-if="$vuetify.breakpoint.mdAndUp">
          <v-stepper-content step="1">
            <step-one :step.sync="step" :code.sync="confirmForm.code" :phone.sync="confirmForm.phone"/>
          </v-stepper-content>

          <v-stepper-content step="2">
            <step-three :phone="confirmForm.phone" :code="confirmForm.code"/>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import request from '../mixins/request'
import alert from '../mixins/alert'
import StepOne from '../components/auth/confirm/StepOne'
import { REQUEST } from '../config'
import emailService from '../services/verification-service'
import StepThree from '../components/auth/confirm/StepThreeConfirmSignUp'

export default {
  name: 'ConfirmSignUp',
  mixins: [request, alert],
  components: { StepThree, StepOne },
  data () {
    return {
      step: 1,
      confirmForm: {
        phone: '',
        code: ''
      }
    }
  },
  methods: {
    verify () {
      let that = this

      that.setRequest(REQUEST.VERIFY)

      emailService.verify(this.confirmForm.phone, null, this.confirmForm.code)
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
    }
  }
}
</script>

<style scoped>

</style>
