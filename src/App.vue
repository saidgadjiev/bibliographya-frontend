<template>
  <v-app class="background">
    <v-layout align-center justify-center row v-if="_isRequest(Request.GET_ACCOUNT)">
      <v-flex shrink>
        <progress-circular/>
      </v-flex>
    </v-layout>
    <layout v-else></layout>
  </v-app>
</template>

<script>
import Layout from './layouts/layout/Layout.vue'
import { GET_ACCOUNT } from './store/action-types'
import request from './mixins/request'
import ProgressCircular from './components/progress/ProgressCircular'

export default {
  name: 'App',
  mixins: [request],
  data () {
    return {
      drawer: false
    }
  },
  created () {
    this.$store.dispatch(GET_ACCOUNT)
  },
  components: {
    ProgressCircular,
    Layout
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

  .mobile-container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .mobile-container .flex {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .mobile-container .layout:only-child {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
</style>
