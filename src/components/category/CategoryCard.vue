<template>
  <v-card :to="'/category/' + category.name">
    <v-img
      :src="imageSrc"
    >
      <v-container
        fill-height
        fluid
        pa-2
      >
        <v-layout align-center justify-center>
            <span class="font-weight-bold display-3 white--text" v-text="category.name"></span>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
import fileService from '../../services/file-service'

export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
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
