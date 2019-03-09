<template>
  <v-app class="background">
    <v-layout align-center justify-center row v-if="_isRequest(Request.GET_ACCOUNT)">
      <v-progress-circular
        :size="100"
        :width="10"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
    <component v-else v-bind:is="_layout"></component>
  </v-app>
</template>

<script>
import SignedInLayout from './layouts/signedin/SignedInLayout.vue'
import AuthLayout from './layouts/auth/AuthLayout'
import AnonymousLayout from './layouts/anonymous/AnonymousLayout'
import { GET_ACCOUNT } from './store/action-types'
import request from './mixins/request'

export default {
  name: 'App',
  mixins: [request],
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
    this.$store.dispatch(GET_ACCOUNT)
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
