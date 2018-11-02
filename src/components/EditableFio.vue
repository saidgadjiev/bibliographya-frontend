<template>
  <v-card>
    <v-card-text class="grey lighten-3">
      <strong>{{lastName + ' ' + firstName + ' ' + middleName}}</strong>
    </v-card-text>
    <edit-fio :biography-id="biographyId"></edit-fio>
  </v-card>
</template>

<script>
import EditFio from './EditFio'
import { mapGetters } from 'vuex'

export default {
  name: 'EditableFio',
  props: {
    biographyId: Number
  },
  computed: {
    ...mapGetters([
      'getBiographyById'
    ]),
    firstName () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.firstName : ''
    },
    lastName () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.lastName : ''
    },
    middleName () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.middleName : ''
    }
  },
  components: {
    EditFio
  }
}
</script>

<style scoped>

</style>
