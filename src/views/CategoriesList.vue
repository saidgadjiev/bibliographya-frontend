<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 md6 v-for="item in items" :key="item.id">
          <category-card :category="item"></category-card>
    </v-flex>
    <v-flex xs12>
      <infinite-loading @infinite="infiniteLoad">
        <div slot="spinner">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </v-flex>
  </v-layout>
</template>

<script>
import CategoryCard from '../components/category/CategoryCard'
import biographyCategoryService from '../services/biography-category-service'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'CategoriesList',
  data () {
    return {
      items: [],
      limit: 50,
      offset: 0
    }
  },
  methods: {
    infiniteLoad ($state) {
      let that = this

      biographyCategoryService.getCategories(this.limit, this.offset)
        .then(
          response => {
            if (response.status === 200) {
              that.items.push(...response.data.content)
              that.offset += response.data.content.length
              $state.loaded()
            } else {
              $state.complete()
            }
          }
        )
    }
  },
  components: {
    CategoryCard,
    InfiniteLoading
  }
}
</script>

<style scoped>

</style>
