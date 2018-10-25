<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field
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
              v-model="signUpForm.lastName"
              :error-messages="errors.collect('lastName')"
              label="Фамилия"
              type="text"
              name="lastName"
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
              v-validate="'required'"
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
              type="password"
              v-model="signUpForm.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="signUp" color="primary" to="/signIn">Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
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
      this.$store.dispatch('signUp', this.signUpForm)
        .then(
          user => {
            this.$router.push('/signIn')
          },
          error => {
            console.log(error)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
