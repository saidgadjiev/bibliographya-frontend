<template>
  <v-content>
    <nav-bar v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
    <tool-bar></tool-bar>
    <pull-to-wrapper
      :pull-to-load-more-method="pullToLoadMoreMethod"
      :pull-to-refresh-method="pullToRefreshMethod"
    >
      <v-container
        :grid-list-lg="$vuetify.breakpoint.mdAndUp"
        :grid-list-sm="$vuetify.breakpoint.smAndDown"
        fill-height
        :class="[ $vuetify.breakpoint.mdAndUp ? 'bib-container' : 'bib-mobile-container' ]"
      >
        <v-layout row fill-height justify-center class="mt-0 mb-0">
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
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    PullToWrapper,
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
