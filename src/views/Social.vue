<template>
  <v-card tile>
    <v-card-title style="justify-content: center">
      Наши сообщества в соц. сетях
    </v-card-title>
    <v-card-actions>
      <v-btn
        left
        color="primary"
        class="white--text"
        :href="tgLink"
      >
        Присоединиться
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { TG_LINK } from '../config'

export default {
  name: 'Social',
  data () {
    return {
      tgLink: TG_LINK
    }
  },
  mounted () {
    window.location.href = TG_LINK
  }
}
</script>

<style scoped>

</style>
