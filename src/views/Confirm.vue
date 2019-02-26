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
            <div class="error--text" v-if="_preconditionFailed">
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
                :loading="confirmRequest"
                :disabled="confirmRequest"
                @click="confirm">
                Подтвердить
              </v-btn>
            </v-flex>
            <v-flex xs12 sm8>
              <v-btn
                color="blue darken-3"
                class="white--text"
                block
                :loading="resendCode"
                :disabled="resendCode"
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
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'Confirm',
  data () {
    return {
      resendCode: false,
      confirmRequest: false,
      confirmForm: {
        email: '',
        code: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'status'
    ]),
    ...mapState('alert', ['type', 'error']),
    _preconditionFailed () {
      return this.error && this.error.response.status === 412
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
    ...mapActions('alert', [
      'clear'
    ]),
    confirm () {
      let that = this
      that.confirmRequest = true

      this.$store.dispatch('confirmSignUp', this.confirmForm.code)
        .then(
          () => {
            that.confirmRequest = false
            this.$router.push('/signIn')
          },
          e => {
            that.confirmRequest = false
          }
        )
    },
    resend () {
      let that = this

      that.resendCode = true
      emailService.resend(this.confirmForm.email)
        .then(
          response => {
            that.resendCode = false
          },
          e => {
            that.resendCode = false
          }
        )
    }
  },
  watch: {
    'confirmForm.code' (newVal) {
      this.clear()
    }
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style scoped>

</style>
