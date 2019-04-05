<template>
  <v-speed-dial
    class="ml-4"
    v-model="shares"
    direction="right"
    open-on-hover
    transition="'slide-y-reverse-transition'"
    style="z-index: 5;"
  >
    <template #activator>
      <v-btn icon flat color="blue darken-1" v-model="shares">
        <v-icon color="blue darken-1">mdi-share-outline</v-icon>
      </v-btn>
    </template>
    <share-vkontakte :page-url="pageUrl"/>
    <share-whats-app :page-url="pageUrl" :page-description="pageDescription"/>
    <share-telegram :page-url="pageUrl" :page-description="pageDescription"/>
  </v-speed-dial>
</template>

<script>
import ShareVkontakte from '../../../share/providers/Vkontakte'
import ShareWhatsApp from '../../../share/providers/WhatsApp'
import ShareTelegram from '../../../share/providers/Telegram'
export default {
  name: 'ShareIcon',
  components: { ShareTelegram, ShareWhatsApp, ShareVkontakte },
  data: () => ({
    shares: false
  }),
  props: {
    pageUrl: {
      type: String,
      required: true
    },
    pageDescription: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
