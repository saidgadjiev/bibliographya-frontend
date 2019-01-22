<template>
  <v-layout row>
    <v-flex xs12>
      <alert-message></alert-message>
      <edit-biography-card
        v-if="biography"
        :in-biography="biography"
        v-bind.sync="biography"
      ></edit-biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import EditBiographyCard from '../components/biography/EditBiographyCard.vue'
import AlertMessage from '../components/alert/AlertMessage'

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
  beforeDestroy () {
    this.clear()
  },
  components: {
    AlertMessage,
    EditBiographyCard
  }
}
</script>

<style scoped>

</style>
