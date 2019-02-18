<template>
  <v-app class="background">
    <component v-bind:is="_layout"></component>
  </v-app>
</template>

<script>
import SignedInLayout from './layouts/signedin/SignedInLayout.vue'
import AuthLayout from './layouts/auth/AuthLayout'
import AnonymousLayout from './layouts/anonymous/AnonymousLayout'

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    _layout () {
      return this.$store.getters.layout
    }
  },
  created () {
    this.$store.dispatch('getAccount')
  },
  components: {
    'signed-in-layout': SignedInLayout,
    'auth-layout': AuthLayout,
    'anonymous-layout': AnonymousLayout
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
</style>
