<template>
  <v-app class="background">
    <v-layout align-center justify-center row v-if="_isRequest(Request.GET_ACCOUNT)">
      <progress-circular/>
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
</style>
