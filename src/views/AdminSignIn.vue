<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-card-title primary-title style="justify-content: center">
          <h3 class="headline mb-0">Вход в Библиографию</h3>
        </v-card-title>
        <v-card-text v-if="type === 'alert-danger'">
          <strong class="error--text">
            Логин или пароль введены неправильно.
          </strong>
        </v-card-text>
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('username')"
              v-model="signInForm.username"
              name="username"
              label="Логин"
              type="text"
            ></v-text-field>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
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
          <v-btn
            block
            color="primary"
            @click="signIn"
            :loading="status.signingIn"
          >Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'AdminSignIn',
  data () {
    return {
      signInForm: {
        username: '',
        password: ''
      },
      showPassword: false
    }
  },
  computed: {
    ...mapGetters([
      'status'
    ]),
    ...mapState('alert', ['type'])
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
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
    ...mapActions('alert', [
      'clear'
    ]),
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
  beforeRouteLeave (to, from, next) {
    this.clear()
    next()
  }
}
</script>

<style scoped>

</style>
