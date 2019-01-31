<template>
  <v-layout row fill-height="true">
    <v-flex xs12>
      <biography-card2
        v-if="biography"
        live
        show-comments
        v-bind.sync="biography"
      ></biography-card2>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/biography/card/BiographyCard'

export default {
  name: 'BiographyDetails',
  data () {
    return {
      biography: undefined
    }
  },
  props: {
    biographyId: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.loadBiography()
  },
  methods: {
    loadBiography () {
      biographyService.getBiographyById(this.biographyId)
        .then(
          response => {
            this.biography = response.data
          },
          e => {
            console.log(e)
          }
        )
    }
  },
  watch: {
    '$route' (to, from) {
      this.biography = undefined
      this.loadBiography()
    }
  },
  components: {
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
