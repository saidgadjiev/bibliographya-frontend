<template>
  <v-layout row fill-height justify-center>
    <v-flex xs12>
    <edit-biography :biography="biography"></edit-biography>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditProfile',
  computed: {
    ...mapGetters([
      'getBiographyByUsername',
      'getUsername'
    ]),
    biography () {
      return this.getBiographyByUsername(this.getUsername)
    }
  }
}
</script>

<style scoped>

</style>
