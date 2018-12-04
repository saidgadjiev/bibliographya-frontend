<template>
  <v-layout row>
    <v-flex xs12>
      <edit-biography-card
        :in-biography="{
          firstName: '',
          lastName: '',
          middleName: '',
          biography: '',
          lastModified: ''
        }"
        mode="create"
      ></edit-biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import EditBiographyCard from '../components/biography/EditBiographyCard.vue'
export default {
  name: 'CreateBiographyDetails',
  components: {
    EditBiographyCard
  }
}
</script>

<style scoped>

</style>
