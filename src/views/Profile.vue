<template>
  <v-layout row fill-height>
    <v-flex xs12>
      <alert-message :types="['alert-success']"/>
      <biography-card v-if="biography" v-bind.sync="biography" show-publish-block></biography-card>
    </v-flex>
    <alert-dialog :types="['alert-danger']"/>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import BiographyCard from '../components/biography/BiographyCard'
import biographyService from '../services/biography-service'
import AlertMessage from '../components/alert/AlertMessage'
import AlertDialog from '../components/alert/AlertDialog'

export default {
  name: 'profile',
  data () {
    return {
      biography: undefined
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  created () {
    let that = this

    biographyService.getBiographyById(this.getUser.biography.id)
      .then(
        response => {
          that.biography = response.data
        },
        e => {
          console.log(e)
        }
      )
  },
  components: {
    AlertDialog,
    AlertMessage,
    BiographyCard
  }
}
</script>

<style scoped>

</style>
