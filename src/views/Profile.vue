<template>
  <v-layout row fill-height justify-center>
    <v-flex shrink v-if="biographyLoading">
      <progress-circular/>
    </v-flex>
    <v-flex xs12 v-else>
      <alert-message :types="['alert-success']"/>
      <biography-card
        v-bind.sync="biography"
        show-publish-block
        show-comments
      ></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import alert from '../mixins/alert'
import BiographyCard from '../components/biography/card/BiographyCard'
import biographyService from '../services/biography-service'
import AlertMessage from '../components/alert/AlertMessage'
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'Profile',
  mixins: [alert],
  data () {
    return {
      biographyLoading: true,
      biography: undefined
    }
  },
  computed: {
    ...mapGetters([
      'getBiographyId'
    ])
  },
  created () {
    let that = this

    biographyService.getBiographyById(this.getBiographyId)
      .then(
        response => {
          that.biography = response.data
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
    BiographyCard
  }
}
</script>

<style scoped>

</style>
