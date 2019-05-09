<template>
  <v-card class="elevation-12">
    <v-card-title primary-title style="justify-content: center" v-if="mode === 'auth'">
      <h3 class="headline font-weight-bold mb-0">Вход</h3>
    </v-card-title>
    <v-card-text
      v-if="_isError(HttpStatus.UNAUTHORIZED) || _isError(HttpStatus.BAD_REQUEST)"
      style="background-color: #FFCDD2"
      class="font-weight-regular"
    >
      <strong class="d-block">
        Не удается войти.
      </strong>
      <span class="d-block">
        Пожалуйста, проверьте правильность написания <strong>логина</strong> и <strong>пароля</strong>.
      </span>
      <ul>
        <li>
          Введите номер телефона в следующем формате: <strong>79030000007</strong>.
        </li>
      </ul>
    </v-card-text>
    <v-card-text>
      <v-form>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('login')"
          v-model="signInForm.verificationKey"
          name="login"
          label="Телефон или email"
          type="text"
        ></v-text-field>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('password')"
          :append-icon="showPassword ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          v-model="signInForm.password"
          class="mt-2"
          name="password"
          label="Пароль"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 :md4="mode === 'auth'">
          <v-btn
            color="blue darken-3"
            class="white--text"
            block
            @click="signIn"
            :loading="_isRequest(Request.SIGN_IN)"
            :disabled="_isRequest(Request.SIGN_IN)"
          >Войти
          </v-btn>
        </v-flex>
        <v-flex xs12 :md8="mode === 'auth'">
          <v-btn
            block
            class="white--text"
            color="blue darken-3"
            to="/signUp"
          >Регистрация
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn
            class="white--text"
            block
            color="light-green darken-2"
            :loading="_isRequest(Request.OAUTH_REQUEST)"
            :disabled="_isRequest(Request.OAUTH_REQUEST)"
            @click="auth('vk')"
          >
            <v-icon
              left
              color="blue darken-3">
              fab fa-vk
            </v-icon>
            Войти через VK
          </v-btn>
        </v-flex>
        <v-flex shrink>
           <router-link class="bib-a" to="/restore">Забыли пароль?</router-link>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import alert from '../../mixins/alert'
import request from '../../mixins/request'
import { mapGetters } from 'vuex'
import { SIGN_IN } from '../../store/action-types'
import { socialAutheticator } from '../../auth/auth'

export default {
  name: 'SignIn',
  mixins: [alert, request],
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      showPassword: false,
      signInForm: {
        verificationKey: '',
        password: ''
      }
    }
  },
  props: {
    mode: {
      type: String,
      default: 'auth'
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        login: {
          required: () => 'Введите телефона или email'
        },
        password: {
          required: () => 'Введите пароль'
        }
      }
    })
  },
  methods: {
    signIn () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch(SIGN_IN, that.signInForm)
            .then(
              () => {
                that.$router.push('/')
              },
              e => {}
            )
        }
      })
    },
    auth (provider) {
      socialAutheticator.signIn(provider)
    }
  }
}
</script>

<style scoped>

</style>
