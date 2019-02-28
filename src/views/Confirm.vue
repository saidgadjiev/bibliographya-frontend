<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-title>
          <h4>На вашу почту был отправлен код подтверждения регистрации.</h4>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="confirmForm.email"
              disabled
              label="Почта"
              type="text"
              name="email"
            ></v-text-field>
            <v-text-field
              v-validate="'required'"
              v-model="confirmForm.code"
              :error-messages="errors.collect('code')"
              label="Код"
              type="text"
              name="code"
            ></v-text-field>
            <div class="error--text" v-if="_isPreconditionFailedError">
              Неверный код
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-btn
                color="light-green darken-2"
                class="white--text"
                block
                :loading="_isConfirmSignUpRequest"
                :disabled="_isConfirmSignUpRequest"
                @click="confirm">
                Подтвердить
              </v-btn>
            </v-flex>
            <v-flex xs12 sm8>
              <v-btn
                color="blue darken-3"
                class="white--text"
                block
                :loading="_isResendCodeRequest"
                :disabled="_isResendCodeRequest"
                @click="resend">
                Отправить повторно
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import emailService from '../services/email-service'
import alert from '../mixins/alert'
import request from '../mixins/request'
import { CONFIRM_SIGN_UP } from '../store/action-types'
import { REQUEST } from '../config'

export default {
  name: 'Confirm',
  mixins: [alert, request],
  data () {
    return {
      confirmForm: {
        email: '',
        code: ''
      }
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        code: {
          required: () => 'Введите код'
        }
      }
    })
    this.confirmForm.email = this.status.signUpForm.email
  },
  methods: {
    confirm () {
      this.$store.dispatch(CONFIRM_SIGN_UP, this.confirmForm.code)
        .then(
          () => {
            this.$router.push('/signIn')
          }
        )
    },
    resend () {
      this.setRequest(REQUEST.RESEND_CODE)

      emailService.resend(this.confirmForm.email)
        .finally(() => {
          this.clearRequest()
        })
    }
  },
  watch: {
    'confirmForm.code' (newVal) {
      this.clearAlert()
    }
  }
}
</script>

<style scoped>

</style>
