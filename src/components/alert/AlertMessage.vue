<template>
  <div v-if="_show">
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
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AlertMessage',
  props: {
    types: {
      type: Array,
      default: function () {
        return ['alert-success', 'alert-danger']
      }
    }
  },
  computed: {
    _show () {
      return this.type !== null && this.types.indexOf(this.type) > 0
    },
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
