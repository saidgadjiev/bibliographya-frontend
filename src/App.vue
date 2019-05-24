<template>
  <v-app>
    <img :src="_img" class="background">
    <v-layout align-center justify-center row v-if="accountRequest">
      <progress-circular/>
    </v-layout>
    <layout v-else></layout>
  </v-app>
</template>

<script>
import Layout from './layouts/layout/Layout.vue'
import { GET_ACCOUNT } from './store/action-types'
import ProgressCircular from './components/progress/ProgressCircular'
import { TITLE } from './config'
import { mapGetters } from 'vuex'
import { USER_STATE } from './store/modules/user-module'

const Url = require('url-parse')

export default {
  name: 'App',
  data () {
    return {
      accountRequest: true,
      drawer: false
    }
  },
  metaInfo: {
    title: TITLE.MAIN,
    titleTemplate: null
  },
  computed: {
    ...mapGetters([
      'getStatus'
    ]),
    _img () {
      return process.env.BASE_URL + 'static/img/Bibliographya.jpg'
    }
  },
  created () {
    let that = this

    document.addEventListener('deviceready', this.onDeviceReady, false)

    window.handleOpenURL = function (bibliographyaUrl) {
      let url = new Url(bibliographyaUrl)
      let routeUrl = url.host + url.pathname + url.query + url.hash

      that.$router.push(routeUrl)
    }

    this.loadAccount()
    this.$on('online', this.online)
  },
  methods: {
    online () {
      if (this.getStatus === USER_STATE.NONE) {
        this.loadAccount()
      }
    },
    loadAccount () {
      let that = this

      this.$store.dispatch(GET_ACCOUNT)
        .finally(() => {
          that.accountRequest = false
        })
    },
    onDeviceReady () {
      navigator.splashscreen.hide()
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
