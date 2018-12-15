<template>
  <div id="app">
    <v-app>
      <toolbar></toolbar>
      <v-content :style="getBackground">
        <v-container grid-list-lg fill-height style="width:960px" class="ma-auto pt-0 pl-0 pr-0">
          <v-layout row fill-height>
            <v-flex xs3>
              <nav-bar></nav-bar>
            </v-flex>
            <v-flex xs9>
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
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Toolbar
  },
  computed: {
    ...mapGetters([
      'backgroundImagePath'
    ]),
    getBackground () {
      let url

      if (this.backgroundImagePath) {
        url = fileService.getUrl(this.backgroundImagePath)
      } else {
        url = fileService.getUrl('Bibliography.jpg')
      }

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

  .v-toolbar__content {
    width: 960px;
    margin: auto;
    padding: 0;
  }

  .v-navigation-drawer {
    left: unset;
    background-color: inherit;
  }
</style>
