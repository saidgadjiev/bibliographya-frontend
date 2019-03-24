<template>
  <v-layout row fill-height justify-center>
    <progress-circular v-if="biographyLoading"/>
    <v-flex xs12 v-else>
      <alert-message></alert-message>
      <edit-biography-card
        :in-biography="biography"
        v-bind.sync="biography"
      ></edit-biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/biography-service'
import EditBiographyCard from '../components/biography/card/EditBiographyCard.vue'
import AlertMessage from '../components/alert/AlertMessage'
import alert from '../mixins/alert'
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'EditBiographyDetails',
  mixins: [alert],
  data () {
    return {
      biography: undefined,
      biographyLoading: true
    }
  },
  props: {
    biographyId: Number
  },
  created () {
    let that = this

    biographyService.getBiographyById(this.biographyId)
      .then(
        response => {
          that.biography = response.data
          that.biography.categories = response.data.categories.map(e => e.id)
        },
        e => {}
      )
      .finally(() => {
        that.biographyLoading = false
      })
  },
  components: {
    ProgressCircular,
    AlertMessage,
    EditBiographyCard
  }
}
</script>

<style scoped>

</style>
