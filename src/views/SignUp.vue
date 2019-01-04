<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
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
              v-validate="'required'"
              :error-messages="errors.collect('middleName')"
              name="middleName"
              label="Отчество"
              type="text"
              v-model="signUpForm.middleName"
            ></v-text-field>
            <v-text-field
              class="mt-2"
              v-validate="'required|unique'"
              :error-messages="errors.collect('username')"
              name="username"
              label="Логин"
              type="text"
              v-model="signUpForm.username"
            ></v-text-field>
            <v-text-field
              class="mt-2"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              name="password"
              label="Пароль"
              v-model="signUpForm.password"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="signUp" color="primary">Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Validator } from 'vee-validate'
import userAccountService from '../services/user-account-service'

export default {
  name: 'SignUp',
  data () {
    return {
      signUpForm: {
        username: '',
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
        middleName: {
          required: () => 'Введите отчество'
        },
        username: {
          required: () => 'Введите логин'
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
          this.$store.dispatch('signUp', that.signUpForm)
        }
      })
    }
  },
  mounted () {
    const isUnique = value =>
      new Promise(resolve => {
        return userAccountService.isExistUsername(value)
          .then(
            () => {
              resolve({
                valid: true
              })
            },
            e => {
              resolve({
                valid: false,
                data: {
                  message: `Логин ${value} уже занят выберите другой`
                }
              })
            }
          )
      })

    Validator.extend('unique', {
      validate: isUnique,
      getMessage: (field, params, data) => data.message
    })
  }
}
</script>

<style scoped>

</style>
