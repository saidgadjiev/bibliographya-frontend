<template>
  <v-btn
    fab
    dark
    small
    color="primary"
    @click.prevent="showShareWindow"
  >
    <v-icon dark style="font-size: 24px;">fab fa-vk</v-icon>
  </v-btn>
</template>

<script>
import { clickEvent } from '../helpers/events'
import { documentHref } from '../helpers/href'
import { documentTitle } from '../helpers/title'
import { sliceThousandInt } from '../helpers/count_number'
import { getRandomInt } from '../helpers/random_int'
import { openShareUrl } from '../helpers/new_window'

export default {
  name: 'ShareVkontakte',
  props: {
    pageUrl: {
      type: String,
      default: documentHref
    },
    pageTitle: {
      type: String,
      default: documentTitle
    }
  },
  data () {
    return {
      counterVkontakte: 0
    }
  },
  methods: {
    showShareWindow: function () {
      const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(
        this.$props.pageUrl
      )}&title=${encodeURIComponent(
        this.$props.pageTitle
      )}&noparse=true`

      clickEvent(this, 'vkontakte')

      return openShareUrl(shareUrl)
    },

    handleUpdateCount (count) {
      this.counterVkontakte = count >= 1000 ? sliceThousandInt(count) : count
    },

    getShareCounter: function () {
      if (
        window.VK &&
        window.VK.Share &&
        typeof window.VK.Share.count === 'function'
      ) {
        return
      }
      const script = document.createElement('script')

      script.src = `https://vk.com/share.php?act=count&index=${getRandomInt(
        1,
        2345
      )}&url=${encodeURIComponent(this.$props.pageUrl)}`

      document.body.appendChild(script)

      window.VK = Object.assign({}, { Share: {} }, window.VK)
      window.VK.Share.count = (index, count) => {
        if (count) this.$root.$emit('VK:Share:count:update', count)
      }
    }
  },
  mounted () {
    this.$root.$on('VK:Share:count:update', this.handleUpdateCount.bind(this))
  },
  destroyed () {
    this.$root.$off('VK:Share:count:update', this.handleUpdateCount.bind(this))
  }
}
</script>

<style scoped lang="css">
</style>
