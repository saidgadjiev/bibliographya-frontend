<template>
  <v-card>
    <v-card-title primary class="pb-0">
      <span class="d-block">Ваш номер нигде не выводится и используется <strong>только</strong> для входа на сайт. Вся процедура бесплатна.</span><br><br>
      <span class="d-block">Пример для России <strong>9030000007</strong>.</span>
    </v-card-title>
    <v-card-text class="pt-0 pb-0">
      <vue-tel-input
        class="mt-2"
        :only-countries="['RU']"
        disabled-fetching-country
        disabled-formatting
        placeholder=""
        v-model="_phone"
        @onValidate="onValidate"
        @onInput="onValidate"
        :max-len="10"
        enabled-country-code
        @onBlur="blured = true"
        :disabled="confirmCode"
      ></vue-tel-input>
      <a
        v-if="confirmCode"
        class="mt-2 d-block bib-a"
        style="font-size: 12px"
        @click="resetPhone"
      >
      Указать другой номер
      </a>
      <div class="error--text word-break-all" style="font-size: 12px" v-if="!phoneResponse.isValid && blured">
        Введите корректный номер телефона
      </div>
      <div class="error--text word-break-all" v-else-if="_isError(HttpStatus.CONFLICT)">
        Такой номер телефона уже занят выберите другой.&nbsp;<router-link class="bib-a" to="/restore">Забыли пароль?
      </router-link>
      </div>
        <v-text-field
          v-if="confirmCode"
          class="pt-4"
          v-validate="'required|digits:4'"
          v-model="_code"
          :error-messages="errors.collect('code')"
          type="text"
          name="code"
          label="Код подтверждения"
          data-vv-name="code"
        ></v-text-field>
    </v-card-text>
    <v-card-actions style="justify-content: center; padding-left: 16px; padding-right: 16px">
      <v-layout row justify-center wrap>
        <v-flex xs12 v-if="confirmCode">
          <v-btn
            color="blue darken-3"
            class="white--text"
            block
            small
            :loading="_isRequest(Request.VERIFY)"
            :disabled="_isRequest(Request.VERIFY)"
            @click="verify">
            Отправить код
          </v-btn>
        </v-flex>
        <v-flex shrink class=" pt-3">
          <countdown v-if="counting" :time="time" :transform="transform" @end="counting = false">
            <template slot-scope="props">
              <span class="font-weight-medium" style="color: #78909C;">Выслать код повторно через {{ props.minutes }} : {{ props.seconds }}</span>
            </template>
          </countdown>
          <a
            class="bib-a"
            v-else-if="resendCode"
            @click="confirmSignUpStart"
          >
            Отправить код повторно
          </a>
          <a
            class="bib-a"
            v-else
            @click="confirmSignUpStart"
          >
            Получить код
          </a>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../../mixins/alert'
import request from '../../../mixins/request'
import { REQUEST } from '../../../config'
import { SERVER_ERROR } from '../../../messages'
import authService from '../../../services/auth-service'
import VueTelInput from 'vue-tel-input'
import verificationService from '../../../services/verification-service'
import utils from '../../../utils'

export default {
  name: 'StepOne',
  mixins: [alert, request],
  components: { VueTelInput },
  props: {
    step: Number,
    phone: String,
    countryCode: String,
    code: [Number, String]
  },
  data () {
    return {
      phoneResponse: {
        countryCode: '',
        number: '',
        isValid: false
      },
      blured: false,
      counting: false,
      confirmCode: false,
      resendCode: false,
      time: 0
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        code: {
          required: () => 'Введите код подтверждения',
          digits: () => 'Введите 4 цифры'
        }
      }
    })
  },
  methods: {
    resetPhone () {
      this.phoneResponse.number = ''
      this.phoneResponse.isValid = false

      this.confirmCode = false
      this.blured = false
      this.$emit('update:phone', '')
      this.$emit('update:code', '')
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value

        props[key] = `${digits}`
      })

      return props
    },
    onValidate (e) {
      this.phoneResponse.country = e.country.dialCode
      this.phoneResponse.isValid = e.isValid

      this.$emit('update:phone', utils.cleanPhone(e.formattedNumber))
    },
    verify () {
      let that = this

      this.$validator.validate('code').then(result => {
        if (result) {
          that.setRequest(REQUEST.VERIFY)

          verificationService.verify(this.code)
            .then(
              () => {
                that.$emit('update:step', 2)
              },
              e => {
                if (e.response.status === that.HttpStatus.PRECONDITION_FAILED) {
                  that.errors.add({
                    field: 'code',
                    msg: 'Неверный код'
                  })
                }
              }
            ).finally(() => {
              that.clearRequest()
            })
        }
      })
    },
    resend () {
      this.setRequest(REQUEST.RESEND_CODE)
      let that = this

      verificationService.resend()
        .then(
          response => {
            if (response.data.time) {
              that.startTimer(response.data.time)
            }
          }
        ).finally(() => {
          that.clearRequest()
        })
    },
    startTimer (time) {
      this.counting = true
      this.time = time * 1000
    },
    confirmSignUpStart: function () {
      let that = this

      if (this.phoneResponse.isValid) {
        that.setRequest(REQUEST.CONFIRM_SIGN_UP_START)
        that.$emit('update:code', '')

        authService.confirmSignUpStart(utils.cleanPhone(that.phone))
          .then(
            response => {
              if (response.data.time) {
                that.confirmCode = true
                that.resendCode = true
                that.startTimer(response.data.time)
              }
            },
            e => {
              if (e.response.status === that.HttpStatus.CONFLICT) {
                that.setAlertError(e)
              } else if (e.response.status === that.HttpStatus.BAD_REQUEST) {
                if (e.response.data.time) {
                  that.confirmCode = true
                  that.startTimer(e.response.data.time)
                } else {
                  that.$swal.fire({
                    text: SERVER_ERROR,
                    type: 'error',
                    showCloseButton: true
                  })
                }
              }
            }
          ).finally(() => {
            that.clearRequest()
          })
      }
    }
  },
  computed: {
    _code: {
      get () {
        return this.code
      },
      set (val) {
        this.$emit('update:code', val)
      }
    },
    _phone: {
      get () {
        return this.phoneResponse.number
      },
      set (val) {
        this.phoneResponse.number = val.split(' ').join('')
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
  .text-field {
    min-height: 48px;
    font-size: 16px;
  }
</style>
