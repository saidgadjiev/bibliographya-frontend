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
import { openShareUrl } from '../helpers/new_window'

export default {
  name: 'ShareWhatsApp',
  props: {
    pageUrl: {
      type: String,
      default: documentHref
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
      let pageDescription = this.pageDescription.replace('@bold', '*').replace('@/bold', '*')

      const shareUrl = `https://wa.me/?text=${encodeURIComponent(this.$props.pageUrl) + pageDescription}`

      // onClick event
      clickEvent(this, 'whatsapp')

      return openShareUrl(shareUrl)
    }
  }
}
</script>

<style scoped lang="css">
</style>
