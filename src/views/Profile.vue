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
import { mapGetters, mapActions } from 'vuex'
import BiographyCard from '../components/biography/card/BiographyCard'
import biographyService from '../services/biography-service'
import AlertMessage from '../components/alert/AlertMessage'

export default {
  name: 'Profile',
  data () {
    return {
      biography: undefined
    }
  },
  methods: {
    ...mapActions('alert', [
      'clear'
    ])
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
    BiographyCard
  }
}
</script>

<style scoped>

</style>
