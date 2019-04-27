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
      <div class="error--text word-break-all" v-if="_isError(HttpStatus.NOT_FOUND)">
        Пользователя с таким email не найдено.
      </div>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn
        color="primary"
        :loading="_isRequest(Request.RESTORE_PASSWORD)"
        :disabled="_isRequest(Request.RESTORE_PASSWORD)"
        @click="restorePasswordStart"
      >
        Получить код
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../../../mixins/alert'
import request from '../../../../mixins/request'
import { REQUEST } from '../../../../config'
import settingsService from '../../../../services/settings-service'

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
    restorePasswordStart: function () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.setRequest(REQUEST.RESTORE_PASSWORD)

          settingsService.restorePasswordStart(that.email)
            .then(
              () => {
                that.$emit('update:step', 2)
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
