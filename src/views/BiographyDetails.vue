<template>
  <v-layout row fill-height="true">
    <v-flex xs8>
      <biography-card2 :biography="biography"></biography-card2>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/BiographyCard2'

export default {
  name: 'BiographyDetails',
  data () {
    return {
      biography: {}
    }
  },
  props: {
    biographyId: Number
  },
  mounted () {
    biographyService.getBiographyById(this.biographyId)
      .then(
        response => {
          this.biography = response.data
        },
        e => {
          console.log(e)
        }
      )
  },
  components: {
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
