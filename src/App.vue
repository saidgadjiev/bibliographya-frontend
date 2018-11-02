<template>
  <div id="app">
    <v-app>
      <nav-bar></nav-bar>
      <v-content>
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
  },
  mounted () {
    let that = this

    this.$store.dispatch('getAccount')
      .then(
        () => {
          that.$router.push('/')
        },
        error => {
          console.error(error)
        }
      )
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
