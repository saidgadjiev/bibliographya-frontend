<template>
  <list
    :infinite-load="infiniteLoad"
  >
    <template slot="item" slot-scope="{ item }">
      <category-card
        :category="item"
      ></category-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import CategoryCard from '../components/category/CategoryCard'
import biographyCategoryService from '../services/biography-category-service'

export default {
  name: 'CategoriesList',
  methods: {
    infiniteLoad (limit, offset) {
      return biographyCategoryService.getCategories(limit, offset)
        .then(
          response => {
            if (response.status === 200) {
              response.data.content.forEach(function (val) {
                val.flex = 6
              })
            }

            return response
          }
        )
    }
  },
  components: {
    List,
    CategoryCard
  }
}
</script>

<style scoped>

</style>
