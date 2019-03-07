<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.smAndDown">
    <v-stepper-header v-if="$vuetify.breakpoint.mdAndUp">
      <v-stepper-step complete-icon="fas fa-check" :complete="step > 1" step="1">Восстановление</v-stepper-step>

      <v-divider class="hidden-sm-and-down"></v-divider>

      <v-stepper-step complete-icon="fas fa-check" :complete="step > 2" step="2">Подтверждение</v-stepper-step>

      <v-divider class="hidden-sm-and-down"></v-divider>

      <v-stepper-step complete-icon="fas fa-check" step="3">Новый пароль</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card>
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
            <div class="error--text word-break-all" v-if="_isError(HttpStatus.NOT_FOUND)">
              Пользователя с таким email не найдено.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              :loading="_isRequest(Request.RESTORE_PASSWORD)"
              :disabled="_isRequest(Request.RESTORE_PASSWORD)"
              @click="restorePassword"
            >
              Получить код
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <confirm-code
          :email="restoreForm.email"
          :request="Request.VERIFY"
          :code.sync="restoreForm.code"
          label="Код подтверждения отправлен вам на почту."
          :confirm="verify"
        />
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="restoreForm.email"
                disabled
                label="Почта"
                type="text"
                name="email"
              ></v-text-field>
              <v-text-field
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="restoreForm.password"
                class="mt-2"
                name="password"
                label="Новый пароль"
                data-vv-name="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="light-green darken-2"
              class="white--text"
              :loading="_isRequest(Request.CHANGE_PASSWORD)"
              :disabled="_isRequest(Request.CHANGE_PASSWORD)"
              @click="changePassword"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import { REQUEST } from '../config'
import { SERVER_ERROR, PASSWORD_CHANGE_SUCCESS } from '../messages'
import settingsService from '../services/settings-service'
import emailService from '../services/email-service'
import ConfirmCode from '../components/auth/ConfirmCode'

export default {
  name: 'RestorePassword',
  components: { ConfirmCode },
  mixins: [alert, request],
  data () {
    return {
      step: 1,
      showPassword: false,
      restoreForm: {
        email: '',
        code: '',
        password: ''
      }
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        email: {
          required: () => 'Введите почту',
          email: () => 'Введите корректную почту'
        },
        password: {
          required: () => 'Введите пароль'
        }
      }
    })
  },
  methods: {
    resetForm () {
      this.step = 1
      this.restoreForm.code = ''
      this.restoreForm.email = ''
      this.restoreForm.password = ''
    },
    changePassword () {
      let that = this

      this.$validator.validate('password').then(result => {
        if (result) {
          that.setRequest(REQUEST.CHANGE_PASSWORD)

          settingsService.changePassword(this.restoreForm)
            .then(
              () => {
                that.$swal.fire({
                  text: PASSWORD_CHANGE_SUCCESS,
                  type: 'info',
                  showCloseButton: true
                })
                that.$router.push('/signIn')
              },
              e => {
                if (e.response.status === that.HttpStatus.PRECONDITION_FAILED) {
                  that.resetForm()

                  that.$swal.fire({
                    text: SERVER_ERROR,
                    type: 'error',
                    showCloseButton: true
                  })
                }
              }
            ).finally(() => {
              that.clearRequest()
            })
        }
      })
    },
    verify () {
      let that = this

      that.setRequest(REQUEST.VERIFY)

      emailService.verify(this.restoreForm.email, this.restoreForm.code)
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
    restorePassword: function () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.setRequest(REQUEST.RESTORE_PASSWORD)

          settingsService.restorePassword(that.restoreForm.email)
            .then(
              () => {
                that.step = 2
                that.request = REQUEST.NONE
              },
              e => {
                if (e.response.status === that.HttpStatus.NOT_FOUND) {
                  that.setAlertError(e)
                }
              }
            ).finally(() => {
              that.clearRequest()
            })
        }
      })
    }
  },
  watch: {
    'restoreForm.email' (newVal) {
      this.clearAlert()
    }
  }
}
</script>

<style scoped>

</style>
