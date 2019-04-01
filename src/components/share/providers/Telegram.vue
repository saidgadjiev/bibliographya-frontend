<template>
  <v-btn
    fab
    dark
    small
    color="blue lighten-1"
    @click.prevent="showShareWindow"
  >
    <v-icon dark style="font-size: 24px;">fab fa-telegram</v-icon>
  </v-btn>
</template>

<script>
import { clickEvent } from '../helpers/events'
import { documentHrefWithoutHash } from '../helpers/href'
import { openPopUpWindow } from '../helpers/popup_window'

export default {
  name: 'ShareTelegram',
  props: {
    pageUrl: {
      type: String,
      default: documentHrefWithoutHash
    }
  },
  methods: {
    /**
     * Show share window.
     *
     * @return {object} a pop-up window
     */
    showShareWindow: function () {
      // Variables
      const width = 640
      const height = 480
      const shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
        this.$props.pageUrl
      )}`

      // onClick event
      clickEvent(this, 'telegram')

      return openPopUpWindow(shareUrl, width, height)
    }
  }
}
</script>

<style scoped lang="css">
</style>
