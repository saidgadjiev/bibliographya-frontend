<template>
  <v-card>
    <v-card-title primary class="pb-0">
      <strong class="d-block">Придумайте пароль.</strong>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-validate="'required|min:6'"
          :error-messages="errors.collect('password')"
          :append-icon="showPassword ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          v-model="confirmForm.password"
          class="mt-2"
          name="password"
          label="Пароль"
          data-vv-name="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn
        color="blue darken-3"
        class="white--text"
        :loading="_isRequest(Request.CONFIRM_SIGN_UP_FINISH)"
        :disabled="_isRequest(Request.CONFIRM_SIGN_UP_FINISH)"
        @click="confirm"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../../mixins/alert'
import request from '../../../mixins/request'
import { SESSION_EXPIRED, WELCOME_TITLE, WELCOME } from '../../../messages'
import { CONFIRM_SIGN_UP } from '../../../store/action-types'

export default {
  name: 'StepThreeConfirmSignUp',
  mixins: [alert, request],
  data () {
    return {
      showPassword: false,
      confirmForm: {
        password: ''
      }
    }
  },
  props: {
    phone: String,
    code: String
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        password: {
          required: () => 'Введите пароль',
          min: () => 'Пароль слишком короткий. Используйте хотя бы 6 символов.'
        }
      }
    })
  },
  methods: {
    confirm () {
      let that = this

      that.$validator.validate('password').then(result => {
        if (result) {
          that.confirmForm.verificationKey = that.phone
          that.confirmForm.code = that.code
          this.$store.dispatch(CONFIRM_SIGN_UP, this.confirmForm)
            .then(
              user => {
                if (user.isNew) {
                  that.$swal.fire({
                    title: WELCOME_TITLE,
                    text: WELCOME,
                    type: 'info',
                    showCloseButton: true
                  })
                }
                that.$router.push('/')
              },
              e => {
                if (e.response.status === this.HttpStatus.BAD_REQUEST || e.response.status === this.HttpStatus.PRECONDITION_FAILED) {
                  that.$swal.fire({
                    text: SESSION_EXPIRED,
                    type: 'warning',
                    showCloseButton: true
                  })
                  that.$router.push('/signUp')
                }
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
