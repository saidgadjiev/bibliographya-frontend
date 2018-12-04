<template>
  <v-layout row fill-height="true">
    <v-flex xs12 md8>
      <biography-card2
        v-if="biography"
        show-comments
        :biography="biography"
        show-actions
        show-menu
      ></biography-card2>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  name: 'BiographyDetails',
  props: {
    biographyId: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    }
  },
  asyncComputed: {
    biography () {
      return biographyService.getBiographyById(this.biographyId)
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
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
