<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        style="background-color: #fafafa"
        permanent
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
      >
        <v-list dense>
          <v-list-tile to="/profile">
            <v-list-tile-action>
              <v-icon>fas fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Моя биография</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>far fa-newspaper</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Биографии</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <span class="hidden-sm-and-down">Библиография</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-content class="pt-0">
        <v-container grid-list-md fill-height>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
