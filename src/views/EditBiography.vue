<template>
  <v-layout row>
    <v-flex>
      <edit-biography-card v-if="biography" :in-biography="biography"></edit-biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import EditBiographyCard from '../components/EditBiographyCard.vue'

export default {
  name: 'EditBiography',
  data () {
    return {
      biography: undefined
    }
  },
  props: {
    biographyId: Number
  },
  created () {
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
    EditBiographyCard
  }
}
</script>

<style scoped>

</style>
