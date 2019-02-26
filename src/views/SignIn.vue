<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-card-title primary-title style="justify-content: center">
          <h3 class="headline font-weight-bold mb-0">Вход в Библиографию</h3>
        </v-card-title>
        <v-card-text v-if="type === 'alert-danger'">
          <strong class="error--text">
            Email или пароль введены неправильно.
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
              :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
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
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-btn
                color="light-green darken-2"
                class="white--text"
                block
                @click="signIn"
                :loading="status.signInRequest"
                :disabled="status.signInRequest"
              >Войти</v-btn>
            </v-flex>
            <v-flex xs12 sm8>
              <v-btn
                block
                class="white--text"
                color="blue darken-3"
                to="/signUp"
              >Регистрация</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn
                class="white--text"
                block
                color="light-green darken-2"
                @click="auth('vk')"
              ><v-icon
                left
                color="blue darken-3">
                fab fa-vk
              </v-icon>
                Войти через VK
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { getRedirectUri } from '../config'
import authService from '../services/auth-service'

export default {
  name: 'SignIn',
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
    anonymous: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'status',
      'isAuthenticated'
    ]),
    ...mapState('alert', ['type'])
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
    ...mapActions('alert', [
      'clear'
    ]),
    auth (provider) {
      authService.getOauthUrl(provider, getRedirectUri(provider))
        .then(
          response => {
            window.location.href = response.data
          }
        )
    },
    signIn () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('signIn', that.signInForm)
            .then(
              response => {
                that.$router.push('/')
              },
              e => {
              }
            )
        }
      })
    }
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style scoped>

</style>
