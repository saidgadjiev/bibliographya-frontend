<template>
  <v-layout row fill-height>
    <v-flex xs4>
      <h5>
        Это вам может быть интересно
      </h5>
      <interesting-biographies></interesting-biographies>
    </v-flex>
    <v-flex xs8>
      <biography-card :biography="biography"></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import BiographyCard from '../components/biography/BiographyCard'
import InterestingBiographies from '../components/InterestingBiographies.vue'
import biographyService from '../services/biography-service'

export default {
  name: 'profile',
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  asyncComputed: {
    biography () {
      return biographyService.getBiographyById(this.getUser.biographyId)
        .then(
          response => {
            return response.data
          },
          e => {
            console.log(e)
          }
        )
    }
  },
  components: {
    BiographyCard,
    InterestingBiographies
  }
}
</script>

<style scoped>

</style>
