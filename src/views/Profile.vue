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
    <alert-dialog :types="['alert-danger']"/>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  methods: {
    ...mapActions('alert', [
      'clear'
    ])
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
  beforeDestroy () {
    this.clear()
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
