<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-text-field
          class="mt-2"
          v-validate="'required|email'"
          v-model="_email"
          :error-messages="errors.collect('email')"
          name="email"
          label="Почта"
          type="email"
          data-vv-name="email"
        ></v-text-field>
      </v-form>
      <div class="error--text word-break-all" v-if="_isError(HttpStatus.CONFLICT)">
        Такой email уже занят выберите другой.&nbsp;<router-link class="bib-a" to="/restore">Забыли пароль?</router-link>
      </div>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn
        color="primary"
        :loading="_isRequest(Request.CONFIRM_SIGN_UP_START)"
        :disabled="_isRequest(Request.CONFIRM_SIGN_UP_START)"
        @click="confirmSignUpStart"
      >
        Получить код
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../../mixins/alert'
import request from '../../../mixins/request'
import { REQUEST } from '../../../config'
import authService from '../../../services/auth-service'

export default {
  name: 'StepOne',
  mixins: [alert, request],
  props: {
    step: Number,
    email: String
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
  },
  methods: {
    confirmSignUpStart: function () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.setRequest(REQUEST.CONFIRM_SIGN_UP_START)

          authService.confirmSignUpStart(that.email)
            .then(
              () => {
                that.$emit('update:step', 2)
              },
              e => {
                if (e.response.status === that.HttpStatus.CONFLICT) {
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
  computed: {
    _email: {
      get () {
        return this.email
      },
      set (val) {
        this.$emit('update:email', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
