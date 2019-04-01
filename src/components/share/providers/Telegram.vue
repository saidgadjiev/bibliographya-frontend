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
import { openShareUrl } from '../helpers/new_window'

export default {
  name: 'ShareTelegram',
  props: {
    pageUrl: {
      type: String,
      default: documentHrefWithoutHash
    },
    pageDescription: {
      type: String,
      default: ''
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
      let pageDescription = this.pageDescription.replace('@bold', '**').replace('@/bold', '**')

      const shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
        this.$props.pageUrl
      )}&text=${pageDescription}`

      // onClick event
      clickEvent(this, 'telegram')

      return openShareUrl(shareUrl)
    }
  }
}
</script>

<style scoped lang="css">
</style>
