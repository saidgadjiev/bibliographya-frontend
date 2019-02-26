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
            <div class="error--text word-break-all" v-if="_userNotFound">
              Пользователя с таким email не найдено.
            </div>
          </v-card-text>
        </v-card>

        <v-btn
          color="primary"
          :loading="_restorePassword"
          :disabled="_restorePassword"
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
            <strong>Код подтверждения отправлен вам на почту.</strong>
            <v-text-field
              v-model="restoreForm.email"
              disabled
              label="Почта"
              type="text"
              name="email"
            ></v-text-field>
            <v-text-field
              v-validate="'required'"
              v-model="restoreForm.code"
              :error-messages="errors.collect('code')"
              label="Код"
              type="text"
              data-vv-name="code"
              name="code"
            ></v-text-field>
            <div class="error--text" v-if="_preconditionFailed">
              Неверный код
            </div>
          </v-card-text>
        </v-card>

        <v-layout row justify-start>
          <v-flex xs12 sm3>
            <v-btn
              color="light-green darken-2"
              class="white--text"
              :loading="_verify"
              :disabled="_verify"
              @click="verify"
            >
              Подтвердить
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4>
            <v-btn
              color="blue darken-3"
              class="white--text"
              :loading="_resendCode"
              :disabled="_resendCode"
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
          :loading="_changePassword"
          :disabled="_changePassword"
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

const ERROR = {
  NONE: -1,
  USER_NOT_FOUND: 0,
  PRECONDITION_FAILED: 1
}

const REQUEST = {
  NONE: -1,
  RESTORE_PASSWORD: 0,
  VERIFY: 1,
  RESEND_CODE: 2,
  CHANGE_PASSWORD: 3
}

export default {
  name: 'RestorePassword',
  data () {
    return {
      step: 0,
      error: ERROR.NONE,
      request: REQUEST.NONE,
      restoreForm: {
        email: '',
        code: '',
        newPassword: ''
      }
    }
  },
  computed: {
    _restorePassword () {
      return this.request === REQUEST.RESTORE_PASSWORD
    },
    _resendCode () {
      return this.request === REQUEST.RESEND_CODE
    },
    _verify () {
      return this.request === REQUEST.VERIFY
    },
    _changePassword () {
      return this.request === REQUEST.CHANGE_PASSWORD
    },
    _userNotFound () {
      return this.error === ERROR.USER_NOT_FOUND
    },
    _preconditionFailed () {
      return this.error === ERROR.PRECONDITION_FAILED
    }
  },
  methods: {
    changePassword () {
      let that = this
      that.request = REQUEST.CHANGE_PASSWORD

      userAccountService.changePassword(this.restoreForm)
        .then(
          () => {
            that.request = REQUEST.NONE
            that.$router.push('/signIn')
          },
          e => {
            that.step = 0
            that.request = REQUEST.NONE
          }
        )
    },
    resend () {
      let that = this
      that.request = REQUEST.RESEND_CODE

      emailService.resend(this.restoreForm.email)
        .then(
          () => {
            that.request = REQUEST.NONE
          },
          e => {
            that.request = REQUEST.NONE
          }
        )
    },
    verify () {
      let that = this

      this.$validator.validate('code').then(result => {
        if (result) {
          that.request = REQUEST.VERIFY

          emailService.verify(this.restoreForm.email, this.restoreForm.code)
            .then(
              () => {
                that.step = 3
                that.request = REQUEST.NONE
              },
              e => {
                if (e.response.status === 428) {
                  that.error = ERROR.PRECONDITION_FAILED
                }
                that.request = REQUEST.NONE
              }
            )
        }
      })
    },
    restorePassword () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.request = REQUEST.RESTORE_PASSWORD

          userAccountService.restorePassword(that.restoreForm.email)
            .then(
              () => {
                that.step = 2
                that.request = REQUEST.NONE
              },
              e => {
                if (e.response.status === 404) {
                  that.error = ERROR.USER_NOT_FOUND
                }
                that.request = REQUEST.NONE
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
