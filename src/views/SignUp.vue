<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate.immediate="'required'"
              v-model="signUpForm.firstName"
              :error-messages="errors.collect('firstName')"
              label="Имя"
              type="text"
              name="firstName"
            ></v-text-field>
            <v-text-field
              v-validate.immediate="'required'"
              :error-messages="errors.collect('lastName')"
              name="lastName"
              placeholder="Фамилия"
              type="text"
              v-model="signUpForm.lastName"
            ></v-text-field>
            <v-text-field
              v-validate.immediate="'required'"
              :error-messages="errors.collect('middleName')"
              name="middleName"
              placeholder="Отчество"
              type="text"
              v-model="signUpForm.middleName"
            ></v-text-field>
            <v-text-field
              v-validate.immediate="'required'"
              :error-messages="errors.collect('username')"
              prepend-icon="fas fa-user"
              name="username"
              placeholder="Логин"
              type="text"
              v-model="signUpForm.username"
            ></v-text-field>
            <v-text-field
              v-validate.immediate="'required'"
              :error-messages="errors.collect('password')"
              prepend-icon="fas fa-key"
              name="password"
              placeholder="Пароль"
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
  mounted () {
    this.$validator.localize('ru')
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
