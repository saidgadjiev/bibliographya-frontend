<template>
  <v-content>
    <nav-bar v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
    <v-card height="100">
      <v-card-text style="height:100%">
        <v-layout row fill-height>
          <v-flex shrink align-self-center>
            <v-icon large>
              remove_circle
            </v-icon>
          </v-flex>
          <v-flex shrink align-self-center>
            <div style="display: flex; align-items:center;">
              <v-icon large>gavel</v-icon>
              <strong>Биографии</strong>
            </div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink align-self-center>
            OPEN
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
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
import utils from '../../assets/js/utils'

export default {
  name: 'Layout',
  data () {
    return {
      runAppAlert: true
    }
  },
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
    ]),
    _isMobileBrowser () {
      return utils.isMobileBrowser()
    },
    _bibliographyaPath () {
      let path = this.$route.fullPath

      path = path.substring(1)

      return 'bibliographya://' + path
    }
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
