<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('login')"
          v-model="login"
          name="login"
          label="Телефон или email"
          type="text"
        ></v-text-field>
      </v-form>
      <div class="error--text word-break-all" v-if="_isError(HttpStatus.NOT_FOUND)">
        Пользователя с таким телефоном или email не найдено или отсуствует привязанный телефон.
      </div>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn
        color="primary"
        :loading="_isRequest(Request.RESTORE_PASSWORD)"
        :disabled="_isRequest(Request.RESTORE_PASSWORD)"
        @click="restorePasswordStart"
      >
        Далее
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
  data () {
    return {
      login: ''
    }
  },
  props: {
    step: Number
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        login: {
          required: () => 'Введите телефон или email'
        }
      }
    })
  },
  methods: {
    restorePasswordStart: function () {
      let that = this

      this.$validator.validate('login').then(result => {
        if (result) {
          that.setRequest(REQUEST.RESTORE_PASSWORD)

          settingsService.restorePasswordStart(that.login)
            .then(
              response => {
                that.$emit('restore-start', response.data)
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
  }
}
</script>

<style scoped>

</style>
