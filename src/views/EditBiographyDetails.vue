<template>
  <v-layout row>
    <v-flex xs12>
      <edit-biography-card
        v-if="biography"
        :in-biography="biography"
        v-on:update:firstName="biography.firstName = $event"
        v-on:update:lastName="biography.lastName = $event"
        v-on:update:middleName="biography.middleName = $event"
        v-on:update:biography="biography.biography = $event"
        v-on:update:lastModified="biography.lastModified = $event"
        v-on:update:categories="biography.categories = $event"
      ></edit-biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import EditBiographyCard from '../components/biography/EditBiographyCard.vue'

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
