<template>
  <v-card-title>
    <v-btn v-if="publishStatus === 1" @click="publish" class="ma-0 white--text" color="green darken-2">
      Опубликовать
    </v-btn>
    <v-btn v-else @click="unpublish" class="ma-0 white--text" color="deep-purple darken-4">
      Снять с публикации
    </v-btn>
  </v-card-title>
</template>

<script>
import { PUBLISH_STATUS } from '../../../config'
import biographyService from '../../../services/biography-service'

export default {
  name: 'BiographyCardPublishTitle',
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
      let that = this

      biographyService.publish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.PUBLISHED)
          }
        )
    },
    unpublish () {
      let that = this

      biographyService.publish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.NOT_PUBLISHED)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
