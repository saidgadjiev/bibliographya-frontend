<template>
  <v-layout row fill-height="true">
    <v-flex xs4>
      <v-card class="body-1 grey lighten-3">
        <v-card-title primary-title class="pb-0">
          <div>
            <h5>
               Это вам может быть интересно
            </h5>
          </div>
        </v-card-title>
        <v-container
          fluid
          grid-list-lg
        >
      <interesting-biographies></interesting-biographies>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs8>
      <biography-card2 :biography="biography"></biography-card2>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import BiographyCard2 from '../components/BiographyCard2'
import InterestingBiographies from '../components/InterestingBiographies.vue'

export default {
  name: 'profile',
  computed: {
    ...mapGetters([
      'getBiographyByUsername',
      'getUsername'
    ]),
    biography () {
      return this.getBiographyByUsername(this.getUsername)
    }
  },
  components: {
    BiographyCard2,
    InterestingBiographies
  }
}
</script>

<style scoped>

</style>
