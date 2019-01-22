<template>
  <v-layout row>
    <v-flex xs12>
      <alert-message :types="['alert-success']"></alert-message>
      <edit-biography-card
        mode="create"
      ></edit-biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import EditBiographyCard from '../components/biography/EditBiographyCard.vue'
import AlertMessage from '../components/alert/AlertMessage'
export default {
  name: 'CreateBiographyDetails',
  beforeDestroy () {
    this.clear()
  },
  components: {
    AlertMessage,
    EditBiographyCard
  }
}
</script>

<style scoped>

</style>
