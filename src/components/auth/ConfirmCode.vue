<template>
  <v-card>
    <v-card-title>
      <h4>{{ label }}</h4>
    </v-card-title>
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
          v-validate="'required|digits:4'"
          v-model="_code"
          :error-messages="errors.collect('code')"
          label="Код"
          type="text"
          name="code"
          data-vv-name="code"
        ></v-text-field>
        <div class="error--text" v-if="_isError(HttpStatus.PRECONDITION_FAILED)">
          Неверный код
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-btn
            color="blue darken-3"
            class="white--text"
            block
            :loading="_isRequest(request)"
            :disabled="_isRequest(request)"
            @click="doConfirm">
            Подтвердить
          </v-btn>
        </v-flex>
        <v-flex xs12 sm8>
          <v-btn
            color="blue darken-3"
            class="white--text"
            block
            :loading="_isRequest(Request.RESEND_CODE)"
            :disabled="_isRequest(Request.RESEND_CODE)"
            @click="resend">
            Отправить повторно
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../mixins/alert'
import request from '../../mixins/request'
import { REQUEST } from '../../config'
import emailService from '../../services/email-service'

export default {
  name: 'ConfirmCode',
  mixins: [alert, request],
  props: {
    request: Number,
    code: [Number, String],
    email: String,
    label: String,
    confirm: Function
  },
  methods: {
    doConfirm () {
      let that = this

      this.$validator.validate('code').then(result => {
        if (result) {
          that.confirm()
        }
      })
    },
    resend () {
      this.setRequest(REQUEST.RESEND_CODE)
      let that = this

      emailService.resend(this.email)
        .finally(() => {
          that.clearRequest()
        })
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        code: {
          required: () => 'Введите код',
          digits: () => 'Введите 4 цифры'
        }
      }
    })
  },
  computed: {
    _code: {
      get () {
        return this.code
      },
      set (val) {
        this.$emit('update:code', val)
      }
    }
  },
  watch: {
    'code' (newVal) {
      this.clearAlert()
    }
  }
}
</script>

<style scoped>

</style>
