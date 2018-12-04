<template>
  <div id="app">
    <v-app>
      <nav-bar></nav-bar>
      <v-content>
        <img v-if="backgroundImagePath" :src="getBackgroundImageSrc" style="position: fixed">
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
    getBackgroundImageSrc () {
      return fileService.getUrl(this.backgroundImagePath)
    },
    height () {
      return window.innerHeight - 48
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
