<template>
  <v-layout row justify-center>
    <v-flex xs12 md8>
      <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
        <div class="pa-5 green lighten2 white--text">
          <h3>Пожалуйста не покидайте эту страницу, иначе придется проходить процедуру регистрации заново.</h3>
        </div>
        <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
          <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Почта</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Пароль</v-stepper-step>
        </v-stepper-header>

        <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1" v-if="$vuetify.breakpoint.smAndDown">
          Почта
        </v-stepper-step>
        <v-stepper-content step="1" v-if="$vuetify.breakpoint.smAndDown">
          <step-one :step.sync="step" :email.sync="confirmForm.email"/>
        </v-stepper-content>

        <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2" v-if="$vuetify.breakpoint.smAndDown">
          Подтверждение
        </v-stepper-step>

        <v-stepper-content step="2" v-if="$vuetify.breakpoint.smAndDown">
          <confirm-code
            :confirm="verify"
            :request="Request.VERIFY"
            :email="confirmForm.email"
            :code.sync="confirmForm.code"
            label="На вашу почту был отправлен код подтверждения регистрации."
          />
        </v-stepper-content>

        <v-stepper-step complete-icon="fas fa-check" step="3" v-if="$vuetify.breakpoint.smAndDown">Пароль
        </v-stepper-step>

        <v-stepper-content step="3" v-if="$vuetify.breakpoint.smAndDown">
          <step-three :email="confirmForm.email" :code="confirmForm.code"/>
        </v-stepper-content>

        <v-stepper-items v-if="$vuetify.breakpoint.mdAndUp">
          <v-stepper-content step="1">
            <step-one :step.sync="step" :email.sync="confirmForm.email"/>
          </v-stepper-content>

          <v-stepper-content step="2">
            <confirm-code
              :confirm="verify"
              :request="Request.VERIFY"
              :email="confirmForm.email"
              :code.sync="confirmForm.code"
              label="На вашу почту был отправлен код подтверждения регистрации."
            />
          </v-stepper-content>

          <v-stepper-content step="3">
            <step-three :email="confirmForm.email" :code="confirmForm.code"/>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import ConfirmCode from '../components/auth/ConfirmCode'
import request from '../mixins/request'
import alert from '../mixins/alert'
import StepOne from '../components/auth/confirm/StepOne'
import { REQUEST } from '../config'
import emailService from '../services/email-service'
import StepThree from '../components/auth/confirm/StepThreeConfirmSignUp'

export default {
  name: 'ConfirmSignUp',
  mixins: [request, alert],
  components: { StepThree, StepOne, ConfirmCode },
  data () {
    return {
      step: 1,
      confirmForm: {
        email: '',
        code: ''
      }
    }
  },
  methods: {
    verify () {
      let that = this

      that.setRequest(REQUEST.VERIFY)

      emailService.verify(this.confirmForm.email, this.confirmForm.code)
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
