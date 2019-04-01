<template>
  <v-btn
    fab
    dark
    small
    color="green darken-1"
    @click.prevent="showShareWindow"
  >
    <v-icon dark style="font-size: 24px;">fab fa-whatsapp</v-icon>
  </v-btn>
</template>

<script>
import { clickEvent } from '../helpers/events'
import { documentHref } from '../helpers/href'
import { openPopUpWindow } from '../helpers/popup_window'

export default {
  name: 'ShareWhatsApp',
  props: {
    pageUrl: {
      type: String,
      default: documentHref
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
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        this.$props.pageUrl
      )}`

      // onClick event
      clickEvent(this, 'whatsapp')

      return openPopUpWindow(shareUrl, width, height)
    }
  }
}
</script>

<style scoped lang="css">
</style>
