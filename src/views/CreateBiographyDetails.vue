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
import EditBiographyCard from '../components/biography/card/EditBiographyCard.vue'
import AlertMessage from '../components/alert/AlertMessage'
import alert from '../mixins/alert'

export default {
  name: 'CreateBiographyDetails',
  mixins: [alert],
  components: {
    AlertMessage,
    EditBiographyCard
  }
}
</script>

<style scoped>

</style>
