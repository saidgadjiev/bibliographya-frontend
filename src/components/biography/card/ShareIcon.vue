<template>
  <v-speed-dial
    class="ml-4"
    v-model="shares"
    direction="right"
    open-on-hover
    transition="'slide-y-reverse-transition'"
  >
    <template #activator>
      <v-btn icon flat color="blue darken-1" @click="shares = !shares">
        <v-icon color="blue darken-1">mdi-share-outline</v-icon>
      </v-btn>
    </template>
    <share-vkontakte :page-url="pageUrl"/>
    <share-whats-app :page-url="pageUrl"/>
  </v-speed-dial>
</template>

<script>
import ShareVkontakte from '../../share/providers/Vkontakte'
import ShareWhatsApp from '../../share/providers/WhatsApp'
export default {
  name: 'ShareIcon',
  components: { ShareWhatsApp, ShareVkontakte },
  data: () => ({
    shares: false
  }),
  props: {
    pageUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
