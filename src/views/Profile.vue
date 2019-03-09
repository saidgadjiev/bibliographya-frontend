<template>
  <v-layout row fill-height>
    <v-flex xs12>
      <alert-message :types="['alert-success']"/>
      <biography-card
        v-if="biography"
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

export default {
  name: 'Profile',
  mixins: [alert],
  data () {
    return {
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
  },
  components: {
    AlertMessage,
    BiographyCard
  }
}
</script>

<style scoped>

</style>
