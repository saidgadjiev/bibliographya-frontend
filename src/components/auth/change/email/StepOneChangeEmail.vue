<template>
  <v-card>
    <v-card-text>
      <span v-if="currentEmail">Ваша текущая почта <strong>{{ currentEmail }}</strong>.</span>
      <v-form>
        <v-text-field
          class="mt-2"
          v-validate="'required|email'"
          v-model="email"
          :error-messages="errors.collect('email')"
          name="email"
          label="Электронная почта"
          type="email"
          data-vv-name="email"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn
        color="blue darken-3"
        class="white--text"
        :loading="_isRequest(Request.CHANGE_EMAIL)"
        :disabled="_isRequest(Request.CHANGE_EMAIL)"
        @click="saveEmailStart"
      >
        Изменить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../../../mixins/alert'
import request from '../../../../mixins/request'
import settingsService from '../../../../services/settings-service'

export default {
  name: 'StepOneChangeEmail',
  mixins: [alert, request],
  data () {
    return {
      email: ''
    }
  },
  props: {
    currentEmail: String
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
    saveEmailStart () {
      let that = this

      this.$validator.validate('email').then(result => {
        if (result) {
          that.setRequest(this.Request.CHANGE_EMAIL)

          settingsService.saveEmailStart(this.email)
            .then(
              response => {
                that.$emit('save-start', response.data)
                that.$emit('update:step', 2)
              }
            )
            .finally(() => {
              that.clearRequest()
            })
        }
      })
    }
  },
  watch: {
    'email' (newVal) {
      this.clearAlert()
    }
  }
}
</script>

<style scoped>

</style>
