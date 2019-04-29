<template>
  <v-card>
    <v-card-text>
      <span v-if="currentPhone">Ваш текущий номер телефона <strong>{{ currentPhone }}</strong>.</span>
      <v-form>
        <vue-tel-input
          class="mt-2"
          :only-countries="['RU']"
          disabled-fetching-country
          disabled-formatting
          placeholder=""
          v-model="phoneResponse.phone"
          @onValidate="onValidate"
          @onInput="onValidate"
          :max-len="10"
          enabled-country-code
          @onBlur="blured = true"
        ></vue-tel-input>
        <div class="error--text word-break-all" style="font-size: 12px" v-if="!phoneResponse.isValid && blured">
          Введите корректный номер телефона
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn
        color="blue darken-3"
        class="white--text"
        :loading="_isRequest(Request.CHANGE_PHONE)"
        :disabled="_isRequest(Request.CHANGE_PHONE)"
        @click="savePhoneStart"
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
import VueTelInput from 'vue-tel-input'

export default {
  name: 'StepOneChangeEmail',
  mixins: [alert, request],
  components: { VueTelInput },
  data () {
    return {
      blured: false,
      phoneResponse: {
        phone: ''
      }
    }
  },
  props: {
    currentPhone: String
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        email: {
          required: () => 'Введите номер телефона'
        }
      }
    })
  },
  methods: {
    onValidate (e) {
      this.phoneResponse.country = e.country.dialCode
      this.phoneResponse.isValid = e.isValid
    },
    savePhoneStart () {
      let that = this

      this.$validator.validate('phone').then(result => {
        if (result) {
          that.setRequest(this.Request.CHANGE_PHONE)

          settingsService.saveEmailStart(this.phone)
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
    'phone' (newVal) {
      this.clearAlert()
    }
  }
}
</script>

<style scoped>

</style>
