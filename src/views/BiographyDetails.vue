<template>
  <v-layout row fill-height="true">
    <v-flex xs8>
      <biography-card :biography-id="biographyId"></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import BiographyCard from '../components/BiographyCard'

export default {
  name: 'BiographyDetails',
  props: [
    'biographyId'
  ],
  components: {
    BiographyCard
  }
}
</script>

<style scoped>

</style>
