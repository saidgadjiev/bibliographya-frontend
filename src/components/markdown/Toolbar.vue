<template>
  <v-layout row justify-end>
    <v-btn icon flat
           @click="click('help')"
    >
      <v-icon small>fas fa-question</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'Toolbar',
  methods: {
    click (action) {
      this.$emit(action)
    }
  }
}
</script>

<style scoped>

</style>
