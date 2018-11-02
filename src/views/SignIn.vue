<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
                <v-card-text v-if="signInStatusCode !== 200" class="deep-orange accent-2">
                  <strong class="d-block">
                    Не удается войти.
                  </strong>
                  <span class="d-block mt-1">
                    Пожалуйста, проверьте правильность написания логина и пароля.
                  </span>
                  <ul class="mt-3">
                    <li>Возможно, нажата клавиша CAPS-lock?</li>
                    <li>Может быть, у Вас включена неправильная <strong>раскладка</strong>? (русская или английская)</li>
                    <li>Попробуйте набрать свой пароль в текстовом редакторе и <strong>скопировать</strong> в графу «Пароль».</li>
                  </ul>
                </v-card-text>
                <v-card-text>
                    <v-form>
                        <v-text-field
                          v-validate="'required'"
                          :error-messages="errors.collect('username')"
                          v-model="signInForm.username"
                          prepend-icon="fas fa-user"
                          name="username"
                          label="Логин"
                          type="text"
                        ></v-text-field>
                        <v-text-field
                          v-validate="'required'"
                          :error-messages="errors.collect('password')"
                          v-model="signInForm.password"
                          class="mt-2"
                          prepend-icon="fas fa-key"
                          name="password"
                          label="Пароль"
                          type="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="signIn">Войти</v-btn>
                    <v-btn color="primary" to="/signup">Регистрация</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      signInForm: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'signInStatusCode'
    ])
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
    signIn () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('signIn', that.signInForm)
            .then(
              () => {
                that.$router.push('/')
              },
              error => {
                console.error(error)
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
