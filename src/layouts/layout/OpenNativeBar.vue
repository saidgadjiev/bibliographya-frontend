<template>
  <v-card height="100">
    <v-card-text style="height:100%">
      <v-layout row fill-height>
        <v-flex shrink align-self-center>
          <v-icon medium @click="closeSuggest">
            fas fa-times
          </v-icon>
        </v-flex>
        <v-flex shrink align-self-center class="pl-4">
          <div style="display: flex; flex-direction: column; align-items: center">
            <bibliographya-icon color="#1565C0" size="48"/>
            <strong>Биографии</strong>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex shrink align-self-center>
          <v-btn small color="primary" flat @click="openApp">
            Открыть
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import BibliographyaIcon from '../../components/icon/BibliographyaIcon'
import utils from '../../assets/js/utils'

export default {
  name: 'OpenNativeBar',
  components: { BibliographyaIcon },
  computed: {
    _bibliographyaPath () {
      let path = this.$route.fullPath

      path = path.substring(1)

      return 'bibliographya://' + path
    },
    _isAndroidBrowser () {
      return utils.isAndroidBrowser()
    }
  },
  methods: {
    closeSuggest () {
      this.$emit('close')
    },
    openApp () {
      if (this._isAndroidBrowser) {
        let w = window.open(this._bibliographyaPath, '_system')

        setTimeout(function () {
          if (!w.closed) {
            w.open('market://details?id=com.saidgadjiev.bibliographya', '_system')
          }
        }, 100)
      }
    }
  }
}
</script>

<style scoped>

</style>
