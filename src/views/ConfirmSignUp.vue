<template>
  <v-layout row justify-center>
    <v-flex xs12 md10>
      <v-stepper v-model="step">
        <div class="pa-5 green lighten2 white--text">
          <h3>Пожалуйста не покидайте эту страницу, иначе придется проходить процедуру регистрации заново.</h3>
        </div>
        <v-stepper-header>
          <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1"></v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2"></v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
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
  }
}
</script>

<style scoped>

</style>
