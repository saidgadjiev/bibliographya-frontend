<template>
  <div id="app">
    <v-app>
      <app-nav-bar :drawer.sync="drawer" v-if="$vuetify.breakpoint.smAndDown"></app-nav-bar>
      <toolbar :drawer.sync="drawer"></toolbar>
      <v-content :style="getBackground">
        <v-container grid-list-lg fill-height :class="{ 'md-content' : $vuetify.breakpoint.mdAndUp }">
          <v-layout row fill-height>
            <v-flex md3 v-if="$vuetify.breakpoint.mdAndUp">
              <app-nav-bar></app-nav-bar>
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
import AppNavBar from './components/AppNavBar.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  components: {
    AppNavBar,
    Toolbar
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
