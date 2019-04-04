<template>
  <v-content>
    <nav-bar v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
    <tool-bar></tool-bar>
    <vue-pull-to
      :top-load-method="pullToRefreshMethod"
      :bottom-load-method="pullToLoadMoreMethod"
    >
      <v-container
        :grid-list-lg="$vuetify.breakpoint.mdAndUp"
        :grid-list-md="$vuetify.breakpoint.smAndDown"
        fill-height
        :class="[ $vuetify.breakpoint.mdAndUp ? 'bib-container' : 'bib-mobile-container' ]"
      >
        <v-layout row fill-height justify-center class="mt-0 mb-0">
          <v-flex md3 v-if="$vuetify.breakpoint.mdAndUp">
            <sidebar/>
          </v-flex>
          <v-flex xs12 md9>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </vue-pull-to>
  </v-content>
</template>

<script>
import NavBar from './NavBar.vue'
import ToolBar from './ToolBar.vue'
import { SET_DRAWER } from '../../store/mutation-types'
import { mapGetters } from 'vuex'
import VuePullTo from '../../components/pullTo/VuePullTo'
import Sidebar from './Sidebar'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    VuePullTo,
    NavBar,
    ToolBar
  },
  computed: {
    ...mapGetters([
      'pullToLoadMoreMethod',
      'pullToRefreshMethod'
    ])
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
