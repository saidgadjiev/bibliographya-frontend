<template>
  <v-layout row fill-height justify-center>
    <v-flex xs12>
    <edit-biography :biography="biography"></edit-biography>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import biographyService from '../services/biography-service'

export default {
  name: 'EditProfile',
  computed: {
    ...mapGetters([
      'getUser',
      'getUsername'
    ]),
    asyncComputed: {
      biography () {
        return biographyService.getBiographyById(this.getUser.biographyId)
          .then(
            response => {
              return response.data
            },
            e => {
              console.log(e)
            }
          )
      }
    }
  }
}
</script>

<style scoped>

</style>
