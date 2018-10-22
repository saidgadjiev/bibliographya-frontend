<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="fas fa-user" name="login" placeholder="Логин" type="text"></v-text-field>
                        <v-text-field id="password" prepend-icon="fas fa-key" name="password" placeholder="Пароль" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" to="/">Войти</v-btn>
                    <v-btn color="primary" to="/signup">Регистрация</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'SignIn'
}
</script>

<style scoped>

</style>
