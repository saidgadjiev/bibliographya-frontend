<template>
  <div>
    <v-alert
      v-if="type === 'alert-success'"
      :value="true"
      @input="clear"
      dismissible
      type="success"
      color="light-green darken-2"
      id="alert-success"
    >
      {{ message }}
    </v-alert>
    <v-alert
      v-if="type === 'alert-danger'"
      :value="true"
      @input="clear"
      dismissible
      type="error"
      id="alert-error"
    >
      {{ message }}
      Изменения сохранены.
      Новые данные будут отражены на Вашей странице.
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AlertSlot',
  computed: {
    ...mapGetters('alert', [
      'type', 'message'
    ])
  },
  methods: {
    ...mapActions('alert', [
      'clear'
    ])
  }
}
</script>

<style scoped>

</style>
