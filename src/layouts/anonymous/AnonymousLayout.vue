<template>
  <div>
    <tool-bar></tool-bar>
    <v-content>
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
  </div>
</template>

<script>
import NavBar from './NavBar'
import ToolBar from './ToolBar'

export default {
  name: 'AnonymousLayout',
  components: { ToolBar, NavBar }
}
</script>

<style scoped>

</style>
