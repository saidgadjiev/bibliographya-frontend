<template>
  <v-content>
    <nav-bar v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
    <tool-bar></tool-bar>
    <pull-to-wrapper>
      <v-container grid-list-lg fill-height :class="{ 'md-content' : $vuetify.breakpoint.mdAndUp }" class="pl-0 pr-0">
        <v-layout row fill-height class="mt-0 mb-0">
          <v-flex md3 v-if="$vuetify.breakpoint.mdAndUp">
            <nav-bar></nav-bar>
          </v-flex>
          <v-flex xs12 md9>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </pull-to-wrapper>
  </v-content>
</template>

<script>
import NavBar from './NavBar.vue'
import ToolBar from './ToolBar.vue'
import { SET_DRAWER } from '../../store/mutation-types'
import PullToWrapper from '../../components/list/PullToWrapper'

export default {
  name: 'Layout',
  components: {
    PullToWrapper,
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
