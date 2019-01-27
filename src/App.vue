<template>
  <div id="app">
    <v-app>
      <nav-bar :drawer.sync="drawer" v-if="$vuetify.breakpoint.smAndDown"></nav-bar>
      <tool-bar :drawer.sync="drawer"></tool-bar>
      <v-content :style="getBackground">
        <v-container grid-list-lg fill-height :class="{ 'md-content' : $vuetify.breakpoint.mdAndUp }">
          <v-layout row fill-height>
            <v-flex md3 v-if="$vuetify.breakpoint.mdAndUp">
              <nav-bar></nav-bar>
            </v-flex>
            <v-flex xs12 md9>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fileService from './services/file-service'
import NavBar from './components/NavBar.vue'
import ToolBar from './components/ToolBar.vue'

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  created () {
    this.$store.dispatch('getAccount')
  },
  components: {
    NavBar,
    ToolBar
  },
  computed: {
    ...mapGetters([
      'backgroundImagePath'
    ]),
    getBackground () {
      let url = fileService.getUrl('Bibliography.jpg')

      return {
        'background': 'url(' + url + ') no-repeat center center fixed',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
      }
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .md-content {
    margin: auto !important;
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    width: 960px !important;
  }
  .v-menu__content {
    z-index: 1 !important;
  }

</style>
