<template>
  <v-layout row fill-height="true">
    <v-flex xs8>
      <biography-card :biography-id="biographyId"></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import BiographyCard from '../components/BiographyCard'

export default {
  name: 'profile',
  computed: {
    ...mapGetters([
      'getBiographyByUsername',
      'getUsername'
    ]),
    biographyId () {
      let biography = this.getBiographyByUsername(this.getUsername)

      return biography ? biography.id : null
    }
  },
  components: {
    BiographyCard
  }
}
</script>

<style scoped>

</style>
