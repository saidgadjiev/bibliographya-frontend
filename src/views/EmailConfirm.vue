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
                v-model="confirmForm.email"
                :error-messages="errors.collect('email')"
                name="email"
                label="Почта"
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
              @click="verifyEmailStart"
            >
              Получить код
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <confirm-code
          :email="confirmForm.email"
          :code.sync="confirmForm.code"
          label="Код подтверждения отправлен вам на почту."
          :confirm="verifyEmailFinish"
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
import { VERIFY_EMAIL } from '../store/action-types'
import { EMAIL_VERIFY_SUCCESS } from '../messages'
import ConfirmCode from '../components/auth/ConfirmCode'

export default {
  name: 'EmailConfirm',
  mixins: [alert, request],
  components: { ConfirmCode },
  data () {
    return {
      step: 1,
      confirmForm: {
        code: '',
        email: ''
      }
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        email: {
          required: () => 'Введите почту',
          email: () => 'Введите корректную почту'
        }
      }
    })
    this.confirmForm.email = this.getEmail
  },
  computed: {
    ...mapGetters([
      'getEmail'
    ])
  },
  methods: {
    resetForm () {
      this.step = 1
      this.confirmForm.email = ''
      this.confirmForm.code = ''
    },
    verifyEmailStart () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.setRequest(this.Request.CHANGE_EMAIL)

          userAccountService.verifyEmailStart(this.confirmForm.email)
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
    verifyEmailFinish () {
      let that = this

      that.$store.dispatch(VERIFY_EMAIL, that.saveEmailForm)
        .then(
          () => {
            that.$swal.fire({
              text: EMAIL_VERIFY_SUCCESS,
              type: 'info',
              showCloseButton: true
            })
            that.$router.push('/settings')
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
