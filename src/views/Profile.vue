<template>
  <v-layout row fill-height>
    <v-flex xs12>
      <biography-card v-if="biography" v-bind.sync="biography"></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import BiographyCard from '../components/biography/BiographyCard'
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
      return biographyService.getBiographyById(this.getUser.biography.id)
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
    BiographyCard
  }
}
</script>

<style scoped>

</style>
