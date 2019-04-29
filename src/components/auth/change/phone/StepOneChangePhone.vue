<template>
  <v-card>
    <v-card-text>
      <span v-if="currentPhone">Ваш текущий номер телефона <strong>{{ currentPhone }}</strong>.</span>
      <v-form>
        <v-text-field
          class="mt-2"
          v-validate="'required'"
          v-model="phone"
          :error-messages="errors.collect('phone')"
          name="phone"
          label="Номер телефона"
          placeholder="+79030000007"
          type="phone"
          data-vv-name="phone"
        ></v-text-field>
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

export default {
  name: 'StepOneChangeEmail',
  mixins: [alert, request],
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
        phone: {
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

          settingsService.savePhoneStart(this.phone)
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
