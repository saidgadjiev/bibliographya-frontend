<template>
  <div id="app">
    <v-app>
      <nav-bar></nav-bar>
      <v-content :style="getBackground">
            <v-container grid-list-lg fill-height>
            <router-view></router-view>
          </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fileService from './services/file-service'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters([
      'backgroundImagePath'
    ]),
    getBackground () {
      if (this.backgroundImagePath) {
        return {
          'background': 'url(' + fileService.getUrl(this.backgroundImagePath) + ') no-repeat center center fixed',
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background-size': 'cover',
          'background-size': 'cover'
        }
      }

      return {}
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
</style>
