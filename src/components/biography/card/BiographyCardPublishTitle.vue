<template>
  <v-card-actions>
    <v-btn
      v-if="publishStatus === 1"
      @click="publish"
      class="ma-0 white--text"
      color="green darken-2"
      :loading="publishLoading"
    >
      Опубликовать
    </v-btn>
    <v-btn
      v-else
      @click="unpublish"
      class="ma-0 white--text"
      color="deep-purple darken-4"
      :loading="unpublishLoading"
    >
      Снять с публикации
    </v-btn>
  </v-card-actions>
</template>

<script>
import { PUBLISHED, UNPUBLISHED, CANT_PUBLISH } from '../../../messages'
import { PUBLISH_STATUS } from '../../../config'
import biographyService from '../../../services/biography-service'

export default {
  name: 'BiographyCardPublishTitle',
  inheritAttrs: false,
  data () {
    return {
      publishLoading: false,
      unpublishLoading: false
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
      this.publishLoading = true
      let that = this

      biographyService.publish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.PUBLISHED)
            that.$store.dispatch('alert/success', PUBLISHED)
            that.publishLoading = false
          },
          e => {
            if (e.response.status === 400) {
              that.$swal.fire({
                text: CANT_PUBLISH,
                type: 'error',
                showCloseButton: true
              })
              that.publishLoading = false
            }
          }
        )
    },
    unpublish () {
      this.unpublishLoading = true
      let that = this

      biographyService.unpublish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.NOT_PUBLISHED)
            that.$store.dispatch('alert/success', UNPUBLISHED)
            that.unpublishLoading = false
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
