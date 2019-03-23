<template>
  <v-card class="elevation-12">
    <v-card-title primary-title style="justify-content: center" v-if="mode === 'auth'">
      <h3 class="headline font-weight-bold mb-0">Вход</h3>
    </v-card-title>
    <v-card-text v-if="_isError(HttpStatus.UNAUTHORIZED)">
      <strong class="error--text">
        Не удается войти. Пожалуйста, проверьте провильность введенных данных.
      </strong>
    </v-card-text>
    <v-card-text>
      <v-form>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('email')"
          v-model="signInForm.email"
          name="email"
          label="Email"
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

export default {
  name: 'SignIn',
  mixins: [alert, request],
  data () {
    return {
      showPassword: false,
      signInForm: {
        email: '',
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
        username: {
          required: () => 'Введите почту'
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
    }
  }
}
</script>

<style scoped>

</style>
