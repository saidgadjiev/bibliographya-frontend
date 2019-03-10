<template>
  <v-card v-if="category" :to="disableLink ? undefined : '/categories/' + category.id" :height="height" tile>
    <v-img
      :height="height"
      :src="imageSrc"
      @load="loading = false"
    >
      <v-layout
        v-if="loading"
        slot="placeholder"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <progress-circular/>
      </v-layout>
      <v-container
        v-else
        fill-height
        fluid
        pa-2
      >
        <v-layout align-center justify-center>
          <span class="font-weight-bold display-1 white--text" v-text="category.name"></span>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
import fileService from '../../services/file-service'
import ProgressCircular from '../progress/ProgressCircular'

export default {
  name: 'CategoryCard',
  components: { ProgressCircular },
  data () {
    return {
      loading: true
    }
  },
  props: {
    height: {
      type: Number,
      default: undefined
    },
    disableLink: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object
    }
  },
  computed: {
    imageSrc () {
      if (this.category.imagePath === 'image-placeholder.jpg') {
        return '/image-placeholder.jpg'
      }

      return fileService.getCategoryResourceUrl(this.category.imagePath)
    }
  }
}
</script>

<style scoped>

</style>
