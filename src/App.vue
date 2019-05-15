<template>
  <v-app>
    <img :src="_img" class="background">
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
import { TITLE } from './config'

const Url = require('url-parse')

export default {
  name: 'App',
  mixins: [request],
  data () {
    return {
      drawer: false
    }
  },
  metaInfo: {
    title: TITLE,
    titleTemplate: null
  },
  computed: {
    _img () {
      return process.env.BASE_URL + 'static/img/Bibliographya.jpg'
    }
  },
  created () {
    window.handleOpenURL = function (bibliographyaUrl) {
      let url = new Url(bibliographyaUrl)
      console.log(url)
    }
    this.$store.dispatch(GET_ACCOUNT)
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  methods: {
    onDeviceReady () {
      console.log('Device Model: ' + device.model)
      console.log('Device Cordova: ' + device.cordova)
      console.log('Device Platform: ' + device.platform)
      console.log('Device UUID: ' + device.uuid)
      console.log('Device Version: ' + device.version)
    }
  },
  components: {
    ProgressCircular,
    Layout
  }
}
</script>

<style>

  @font-face {/* Гарнитура шрифта */
    src: url(/static/fonts/Verdana.ttf); /* Путь к файлу со шрифтом */
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
