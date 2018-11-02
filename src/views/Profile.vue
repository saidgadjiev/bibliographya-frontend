<template>
  <v-layout row fill-height="true">
    <v-flex xs8>
      <biography-card :user-biography="userBiography"></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters([
      'userBiography'
    ])
  }
}
</script>

<style scoped>

</style>
