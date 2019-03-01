<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-card-title primary-title style="justify-content: center">
          <h3 class="headline font-weight-bold mb-0">Регистрация в Библиографии</h3>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate="'required'"
              v-model="signUpForm.lastName"
              :error-messages="errors.collect('lastName')"
              label="Фамилия"
              type="text"
              name="lastName"
            ></v-text-field>
            <v-text-field
              class="mt-2"
              v-validate="'required'"
              v-model="signUpForm.firstName"
              :error-messages="errors.collect('firstName')"
              label="Имя"
              type="text"
              name="firstName"
            ></v-text-field>
            <v-text-field
              class="mt-2"
              label="Отчество"
              type="text"
              v-model="signUpForm.middleName"
            ></v-text-field>
            <v-text-field
              class="mt-2"
              v-validate="'required|email'"
              v-model="signUpForm.email"
              :error-messages="errors.collect('email')"
              name="email"
              label="Почта"
              type="email"
            ></v-text-field>
            <div class="error--text word-break-all" v-if="_isError(HttpStatus.CONFLICT)">
              Такой email уже занят выберите другой.&nbsp;<router-link class="bibliographya-a" to="/restore">Забыли пароль?</router-link>
            </div>
            <v-text-field
              class="mt-2"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              name="password"
              label="Пароль"
              v-model="signUpForm.password"
              :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            @click="signUp"
            color="primary"
            :loading="_isRequest(Request.SIGN_UP)"
            :disabled="_isRequest(Request.SIGN_UP)"
          >Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import { SIGN_UP } from '../store/action-types'

export default {
  name: 'SignUp',
  mixins: [alert, request],
  data () {
    return {
      signUpForm: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: ''
      },
      showPassword: false
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        firstName: {
          required: () => 'Введите имя'
        },
        lastName: {
          required: () => 'Введите фамилию'
        },
        email: {
          required: () => 'Введите почту',
          email: () => 'Введите корректную почту'
        },
        password: {
          required: () => 'Введите пароль'
        }
      }
    })
  },
  methods: {
    signUp () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch(SIGN_UP, that.signUpForm)
            .then(
              () => {
                that.$router.push('/signUp/confirm')
              }
            )
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
