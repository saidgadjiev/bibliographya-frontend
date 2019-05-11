<template>
  <v-btn
    fab
    dark
    small
    color="primary"
    @click.prevent="showShareWindow"
  >
    <template #loader>
      <progress-circular :size="20" :width="3"/>
    </template>
    <v-icon dark style="font-size: 24px;">fab fa-vk</v-icon>
  </v-btn>
</template>

<script>
import { clickEvent } from '../helpers/events'
import { documentHref } from '../helpers/href'
import { sliceThousandInt } from '../helpers/count_number'
import { getRandomInt } from '../helpers/random_int'
import { openShareUrl } from '../helpers/new_window'
import { TITLE, isMobilePlatform } from '../../../config'
import magickService from '../../../services/magick-service'
import fileService from '../../../services/file-service'
import ProgressCircular from '../../progress/ProgressCircular'
import { PROVIDERS } from '../../../auth/auth'

export default {
  name: 'ShareVkontakte',
  components: { ProgressCircular },
  props: {
    pageTitle: {
      type: String,
      default: TITLE
    },
    pageUrl: {
      type: String,
      default: documentHref
    },
    magickText: {
      type: String,
      default: TITLE
    }
  },
  data () {
    return {
      counterVkontakte: 0
    }
  },
  methods: {
    showShareWindow: function () {
      if (isMobilePlatform()) {
        const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(this.$props.pageUrl)}
              &title=${encodeURIComponent(this.$props.pageTitle)}`

        openShareUrl(shareUrl)
      } else {
        magickService.getMagick(PROVIDERS.VK, this.magickText, 50)
          .then(
            response => {
              let imagePath = fileService.getShareResourceUrl(response.data.path)

              const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(this.$props.pageUrl)}
              &title=${encodeURIComponent(this.$props.pageTitle)}
              &image=${encodeURIComponent(imagePath)}`

              openShareUrl(shareUrl)
            }
          )
      }

      clickEvent(this, 'vkontakte')
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
