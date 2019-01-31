<template>
  <v-card v-if="category" :to="disableLink ? undefined : '/category/' + category.name" :height="height">
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
        <v-progress-circular indeterminate color="blue darken-3"></v-progress-circular>
      </v-layout>
      <v-container
        v-else
        fill-height
        fluid
        pa-2
      >
        <v-layout align-center justify-center>
          <span class="font-weight-bold display-2 white--text" v-text="category.name"></span>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
import fileService from '../../services/file-service'

export default {
  name: 'CategoryCard',
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
      return fileService.getUrl(this.category.imagePath)
    }
  }
}
</script>

<style scoped>

</style>
