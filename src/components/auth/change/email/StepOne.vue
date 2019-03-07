<template>
  <v-card>
    <v-card-text>
      <span>Ваша текущая почта <strong>{{ saveEmailForm.email }}</strong> .</span>
      <v-form>
        <v-text-field
          class="mt-2"
          v-validate="'required|email'"
          v-model="saveEmailForm.email"
          :error-messages="errors.collect('email')"
          name="email"
          label="Новая почта"
          type="email"
          data-vv-name="email"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="blue darken-3"
        class="white--text"
        :loading="_isRequest(Request.CHANGE_EMAIL)"
        :disabled="_isRequest(Request.CHANGE_EMAIL)"
        @click="changeEmail"
      >
        Изменить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'StepOne'
  }
</script>

<style scoped>

</style>
