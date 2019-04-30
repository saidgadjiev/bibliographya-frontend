<template>
  <v-card>
    <v-card-title>
      <span v-html="label"></span>
    </v-card-title>
    <v-card-text class="pt-0 pb-0">
      <v-form>
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
    <v-card-actions style="justify-content: center; flex-direction: column;">
      <v-btn
        color="blue darken-3 mb-3"
        class="white--text"
        :loading="_isRequest(request)"
        :disabled="_isRequest(request)"
        @click="doConfirm">
        Отправить код
      </v-btn>
      <countdown v-if="counting" :time="timer" :transform="transform" @end="counting = false">
        <template slot-scope="props">
          <span v-if="$vuetify.breakpoint.mdAndUp" class="font-weight-medium" style="color: #78909C;">Выслать код повторно через {{ props.minutes }} : {{ props.seconds }}</span>
          <v-layout v-else column justify-center align-center>
            <span class="font-weight-medium" style="color: #78909C;">Выслать код повторно через</span>
            <span class="font-weight-medium" style="color: #78909C;">{{ props.minutes }} : {{ props.seconds }}</span>
          </v-layout>
        </template>
      </countdown>
      <a
        class="bib-a"
        v-else
        @click="resend"
      >
        Получить код повторно
      </a>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../mixins/alert'
import request from '../../mixins/request'
import { REQUEST } from '../../config'
import verificationService from '../../services/verification-service'

export default {
  name: 'ConfirmCode',
  mixins: [alert, request],
  data () {
    return {
      counting: false,
      timer: 0
    }
  },
  props: {
    request: Number,
    code: [Number, String],
    label: String,
    confirm: Function,
    time: Number,
    step: [Number, String]
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
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value

        props[key] = `${digits}`
      })

      return props
    },
    startTimer (time) {
      this.counting = true
      this.timer = time * 1000
    },
    resend () {
      this.setRequest(REQUEST.RESEND_CODE)
      let that = this

      verificationService.resend()
        .then(
          response => {
            that.startTimer(response.data.timer.time)
          }
        ).finally(() => {
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
    },
    'step' (newVal) {
      if (newVal === 2) {
        this.startTimer(this.time)
      }
    }
  }
}
</script>

<style scoped>

</style>
