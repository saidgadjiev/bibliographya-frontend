<template>
    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            v-validate="'required'"
            :error-messages="errors.collect('oldPassword')"
            :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            v-model="signInForm.password"
            class="mt-2"
            name="oldPassword"
            label="Старый пароль"
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
    </v-card>
</template>

<script>
  export default {
    name: 'ProfileSettings',
    data () {
      return {
        savePasswordForm: {
          oldPassword: '',
          newPassword: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
