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
          v-validate="'required|min:6'"
          :error-messages="errors.collect('password')"
          :append-icon="showPassword ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
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
    <v-card-actions style="justify-content: center">
      <v-btn
        color="blue darken-3"
        class="white--text"
        :loading="_isRequest(Request.CHANGE_PASSWORD)"
        :disabled="_isRequest(Request.CHANGE_PASSWORD)"
        @click="restorePasswordFinish"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../../../mixins/alert'
import request from '../../../../mixins/request'
import { REQUEST } from '../../../../config'
import settingsService from '../../../../services/settings-service'
import { SERVER_ERROR, PASSWORD_CHANGE_SUCCESS } from '../../../../messages'

export default {
  name: 'StepThree',
  mixins: [alert, request],
  data () {
    return {
      showPassword: false,
      restoreForm: {
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
          required: () => 'Введите пароль',
          min: () => 'Пароль слишком короткий. Используйте хотя бы 6 символов.'
        }
      }
    })
  },
  methods: {
    restorePasswordFinish () {
      let that = this

      this.$validator.validate('password').then(result => {
        if (result) {
          that.setRequest(REQUEST.CHANGE_PASSWORD)

          that.restoreForm.email = that.email
          that.restoreForm.code = that.code
          settingsService.restorePasswordFinish(that.restoreForm)
            .then(
              () => {
                that.$swal.fire({
                  text: PASSWORD_CHANGE_SUCCESS,
                  type: 'info',
                  showCloseButton: true
                })
                that.$router.push('/settings')
              },
              e => {
                if (e.response.status === that.HttpStatus.PRECONDITION_FAILED) {
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
    }
  }
}
</script>

<style scoped>

</style>
