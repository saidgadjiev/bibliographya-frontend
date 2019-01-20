<template>
  <v-card-title>
    <v-btn
      v-if="publishStatus === 1"
      @click="publish"
      class="ma-0 white--text"
      color="green darken-2"
      :loading="loading[0]"
    >
      Опубликовать
    </v-btn>
    <v-btn
      v-else
      @click="unpublish"
      class="ma-0 white--text"
      color="deep-purple darken-4"
      :loading="loading[1]"
    >
      Снять с публикации
    </v-btn>
  </v-card-title>
</template>

<script>
import { PUBLISHED, UNPUBLISHED, CANT_PUBLISH } from '../../../messages'
import { PUBLISH_STATUS } from '../../../config'
import biographyService from '../../../services/biography-service'

export default {
  name: 'BiographyCardPublishTitle',
  data () {
    return {
      loading: [false, false]
    }
  },
  props: {
    id: {
      type: Number
    },
    publishStatus: {
      type: Number
    }
  },
  methods: {
    publish () {
      this.loading[0] = true
      let that = this

      biographyService.publish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.PUBLISHED)
            that.$store.dispatch('alert/success', PUBLISHED)
            that.loading[0] = false
          },
          e => {
            if (e.response.status === 400) {
              that.$store.dispatch('alert/error', CANT_PUBLISH)
              that.loading[0] = false
            }
          }
        )
    },
    unpublish () {
      this.loading[1] = true
      let that = this

      biographyService.unpublish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.NOT_PUBLISHED)
            that.$store.dispatch('alert/success', UNPUBLISHED)
            that.loading[1] = false
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
