<template>
  <v-content>
    <nav-bar v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
    <tool-bar></tool-bar>
    <v-container grid-list-lg fill-height :class="{ 'md-content' : $vuetify.breakpoint.mdAndUp }">
      <v-layout row fill-height class="mt-0 mb-0">
        <v-flex md3 v-if="$vuetify.breakpoint.mdAndUp">
          <nav-bar></nav-bar>
        </v-flex>
        <v-flex xs12 md9>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import NavBar from './NavBar.vue'
import ToolBar from './ToolBar.vue'
import { SET_DRAWER } from '../../store/mutation-types'

export default {
  name: 'Layout',
  components: {
    NavBar,
    ToolBar
  },
  created () {
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.$store.commit(SET_DRAWER, true)
    }
  }
}
</script>

<style scoped>

</style>
