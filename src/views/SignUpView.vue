<template>
  <v-layout justify-center>
    <v-flex xs12 md8>
      <v-card class="elevation-12">
        <v-card-title primary-title style="justify-content: center">
          <h3 class="headline font-weight-bold mb-0">Регистрация</h3>
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout row justify-center wrap>
            <v-flex xs12>
              <v-btn
                block
                @click="signUp"
                color="primary"
                :loading="_isRequest(Request.SIGN_UP)"
                :disabled="_isRequest(Request.SIGN_UP)"
              >Зарегистрироваться</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn
                class="white--text"
                block
                color="light-green darken-2"
                @click="socialSignUp('vk')"
              >
                <v-icon
                  left
                  color="blue darken-3">
                  fab fa-vk
                </v-icon>
                Продолжить с VK
              </v-btn>
            </v-flex>
            <v-flex shrink>
              <router-link class="bib-a" to="/signIn">У меня уже есть аккаунт</router-link>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import { SIGN_UP } from '../store/action-types'
import { socialAutheticator } from '../auth/auth'

export default {
  name: 'SignUpView',
  mixins: [alert, request],
  data () {
    return {
      signUpForm: {
        firstName: '',
        lastName: '',
        middleName: ''
      }
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
        }
      }
    })
  },
  methods: {
    socialSignUp (provider) {
      socialAutheticator.auth(provider)
    },
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
  },
  watch: {
    'signUpForm.email' (newVal) {
      this.clearAlert()
    }
  }
}
</script>

<style scoped>

</style>
