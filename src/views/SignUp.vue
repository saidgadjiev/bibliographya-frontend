<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-card-text>
                    <v-form>
                        <v-text-field
                                prepend-icon="fas fa-user"
                                name="username"
                                placeholder="Логин"
                                type="text"
                                v-model="username"
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="fas fa-key"
                                name="password"
                                placeholder="Пароль"
                                type="password"
                                v-model="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="signUp" color="primary" to="/signin">Зарегистрироваться</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'SignUp',
  daata: {
    username: '',
    password: ''
  },
  methods: {
    signUp () {

    }
  }
}
</script>

<style scoped>

</style>
