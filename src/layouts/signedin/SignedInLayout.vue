<template>
  <v-content>
    <nav-bar :drawer.sync="drawer" v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
    <tool-bar :drawer.sync="drawer"></tool-bar>
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

export default {
  name: 'SignedInLayout',
  data () {
    return {
      drawer: false
    }
  },
  components: {
    NavBar,
    ToolBar
  }
}
</script>

<style scoped>

</style>
