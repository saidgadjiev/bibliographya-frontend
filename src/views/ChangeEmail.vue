<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Изменение</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="grey lighten-3">
          <v-card-text>
            <v-form>
            <v-text-field
              class="mt-2"
              v-validate="'required|email'"
              v-model="saveEmailForm.newEmail"
              :error-messages="errors.collect('newEmail')"
              name="newEmail"
              label="Новая почта"
              type="email"
              data-vv-name="newEmail"
            ></v-text-field>
            <div class="error--text word-break-all" v-if="_isError(HttpStatus.CONFLICT)">
              Такой email уже занят выберите другой.&nbsp;<router-link class="bibliographya-a" to="/restore">Забыли пароль?</router-link>
            </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-3"
              class="white--text"
              :loading="_isRequest(Request.CHANGE_EMAIL)"
              :disabled="_isRequest(Request.CHANGE_EMAIL)"
              @click="changeEmail"
            >
              Отправить повторно
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-3"
        >
          <v-card-text>
            <strong>Код подтверждения отправлен вам на почту.</strong>
            <v-form>
              <v-text-field
                v-model="saveEmailForm.newEmail"
                disabled
                label="Новая почта"
                type="text"
                name="newEmail"
              ></v-text-field>
              <v-text-field
                v-validate="'required'"
                v-model="saveEmailForm.code"
                :error-messages="errors.collect('code')"
                label="Код"
                type="text"
                data-vv-name="code"
                name="code"
              ></v-text-field>
              <div class="error--text" v-if="_isError(HttpStatus.PRECONDITION_FAILED)">
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
                  :loading="_isRequest(Request.SAVE_EMAIL)"
                  :disabled="_isRequest(Request.SAVE_EMAIL)"
                  @click="saveEmail">
                  Подтвердить
                </v-btn>
              </v-flex>
              <v-flex xs12 sm8>
                <v-btn
                  color="blue darken-3"
                  class="white--text"
                  block
                  :loading="_isRequest(Request.RESEND_CODE)"
                  :disabled="_isRequest(Request.RESEND_CODE)"
                  @click="resend">
                  Отправить повторно
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import userAccountService from '../services/user-account-service'
import emailService from '../services/email-service'
import { SAVE_EMAIL } from '../store/action-types'
import { REQUEST } from '../config'

export default {
  name: 'ChangeEmail',
  mixins: [alert, request],
  data () {
    return {
      step: 0,
      saveEmailForm: {
        newEmail: '',
        code: ''
      }
    }
  },
  methods: {
    changeEmail () {
      let that = this

      this.$validator.validate('newEmail').then(result => {
        if (result) {
          that.setRequest(this.Request.CHANGE_EMAIL)

          userAccountService.changeEmail(this.saveEmailForm.newEmail)
            .then(
              () => {
                that.step = 2
              },
              error => {
                if (error.response.status === this.HttpStatus.CONFLICT) {
                  that.setAlertError(error)
                }
              }
            )
            .finally(() => {
              that.clearRequest()
            })
        }
      })
    },
    resend () {
      this.setRequest(REQUEST.RESEND_CODE)
      let that = this

      emailService.resend(this.saveEmailForm.newEmail)
        .finally(() => {
          that.clearRequest()
        })
    },
    saveEmail () {
      let that = this

      this.$validator.validate('code').then(result => {
        if (result) {
          that.$store.dispatch(SAVE_EMAIL)
            .then(
              () => {
                that.$router.push('/settings')
              }
            )
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
