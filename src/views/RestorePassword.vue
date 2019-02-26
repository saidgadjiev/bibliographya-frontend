<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Восстановление</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step complete-icon="fas fa-check" step="3">Новый пароль</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="grey lighten-3"
        >
          <v-card-text>
            <v-form>
              <v-text-field
                class="mt-2"
                v-validate="'required|email'"
                v-model="restoreForm.email"
                :error-messages="errors.collect('email')"
                name="email"
                label="Почта"
                type="email"
                data-vv-name="email"
              ></v-text-field>
            </v-form>
            <div class="error--text word-break-all" v-if="userNotFoundError">
              Пользователя с таким email не найдено.
            </div>
          </v-card-text>
        </v-card>

        <v-btn
          color="primary"
          @click="restorePassword"
        >
          Получить код
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-3"
        >
          <v-card-text>
            <v-text-field
              v-validate="'required'"
              v-model="confirmForm.code"
              :error-messages="errors.collect('code')"
              label="Код"
              type="text"
              data-vv-name="code"
              name="code"
            ></v-text-field>
            <div class="error--text" v-if="preconditionFailed">
              Неверный код
            </div>
          </v-card-text>
        </v-card>

        <v-layout row justify-start>
          <v-flex xs12 sm3>
            <v-btn
              color="light-green darken-2"
              class="white--text"
              @click="verify"
            >
              Подтвердить
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn
              color="blue darken-3"
              class="white--text"
              @click="resend"
            >
              Отправить повторно
            </v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        >

        </v-card>

        <v-btn
          color="primary"
          @click="changePassword"
        >
          Сохранить
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import userAccountService from '../services/user-account-service'
import emailService from '../services/email-service'

export default {
  name: 'RestorePassword',
  data () {
    return {
      step: 0,
      userNotFoundError: false,
      restorePasswordRequest: false,
      preconditionFailed: false,
      restoreForm: {
        email: '',
        code: '',
        newPassword: ''
      }
    }
  },
  methods: {
    changePassword () {
      userAccountService.changePassword(this.restoreForm)
        .then(
          () => {

          },
          e => {

          }
        )
    },
    resend () {
      emailService.resend(this.restoreForm.email)
    },
    verify () {
      this.$validator.validate('code')
      emailService.verify(this.restoreForm.email, this.restoreForm.code)
    },
    restorePassword () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.restorePasswordRequest = true

          userAccountService.restorePassword(that.restoreForm.email)
            .then(
              () => {
                that.step = 2
                that.restorePasswordRequest = false
                that.userNotFoundError = false
              },
              e => {
                if (e.response.status === 404) {
                  that.userNotFoundError = true
                }
                that.restorePasswordRequest = false
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
