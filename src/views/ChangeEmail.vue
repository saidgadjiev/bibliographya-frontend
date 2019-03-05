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
            <span>Ваша текущая почта <strong>{{ getEmail }}</strong> .</span>
            <v-form>
              <v-text-field
                class="mt-2"
                v-validate="'required|email'"
                v-model="saveEmailForm.email"
                :error-messages="errors.collect('email')"
                name="email"
                label="Новая почта"
                type="email"
                data-vv-name="email"
              ></v-text-field>
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
              Изменить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <confirm-code
          :email="saveEmailForm.email"
          :code.sync="saveEmailForm.code"
          label="Код подтверждения отправлен вам на почту."
          :confirm="saveEmail"
        ></confirm-code>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters } from 'vuex'
import alert from '../mixins/alert'
import request from '../mixins/request'
import userAccountService from '../services/user-account-service'
import { SAVE_EMAIL } from '../store/action-types'
import { EMAIL_CHANGE_SUCCESS } from '../messages'
import ConfirmCode from '../components/auth/ConfirmCode'

export default {
  name: 'ChangeEmail',
  components: { ConfirmCode },
  mixins: [alert, request],
  data () {
    return {
      step: 0,
      saveEmailForm: {
        email: '',
        code: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getEmail'
    ])
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
      this.saveEmailForm.email = ''
      this.saveEmailForm.code = ''
    },
    changeEmail () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.setRequest(this.Request.CHANGE_EMAIL)

          userAccountService.changeEmail(this.saveEmailForm.email)
            .then(
              () => {
                that.step = 2
              }
            )
            .finally(() => {
              that.clearRequest()
            })
        }
      })
    },
    saveEmail () {
      let that = this

      that.$store.dispatch(SAVE_EMAIL, that.saveEmailForm)
        .then(
          () => {
            that.$swal.fire({
              text: EMAIL_CHANGE_SUCCESS,
              type: 'info',
              showCloseButton: true
            })
            that.$router.push('/settings')
          }
        )
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
