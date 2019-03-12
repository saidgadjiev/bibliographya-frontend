<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          disabled
          label="Почта"
          type="text"
          name="email"
        ></v-text-field>
        <v-text-field
          v-validate="'required'"
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
import { SERVER_ERROR, WELCOME_TITLE, WELCOME } from '../../../messages'
import { CONFIRM_SIGN_UP } from '../../../store/action-types'

export default {
  name: 'StepThree',
  mixins: [alert, request],
  data () {
    return {
      showPassword: false,
      confirmForm: {
        email: '',
        code: '',
        password: ''
      }
    }
  },
  props: {
    email: String,
    code: String
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        password: {
          required: () => 'Введите пароль'
        }
      }
    })
  },
  methods: {
    confirm () {
      let that = this

      that.$validator.validate('password').then(result => {
        if (result) {
          that.restoreForm.email = that.email
          that.restoreForm.code = that.code
          this.$store.dispatch(CONFIRM_SIGN_UP, this.confirmForm.code)
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
              },
              e => {
                if (e.response.status === this.HttpStatus.BAD_REQUEST) {
                  that.$swal.fire({
                    text: SERVER_ERROR,
                    type: 'error',
                    showCloseButton: true
                  })
                }
              }
            ).finally(() => {
              that.$router.push('/')
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
