<template>
  <v-layout row wrap justify-center infinite-wrapper>
    <v-flex xs12 md6 v-for="item in items" :key="item.id">
      <category-card :category="item"></category-card>
    </v-flex>
    <infinite-loading @infinite="infiniteLoad" :force-use-infinite-wrapper="true">
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
      loading: false,
      items: [],
      limit: 50,
      offset: 0
    }
  },
  methods: {
    infiniteLoad ($state) {
      if (!this.loading) {
        this.loading = true
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
              that.loading = false
            },
            e => {
              that.loading = false
              console.log(e)
            }
          )
      }
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
