<template>
  <v-layout column>
    <v-flex v-if="category" xs12>
      <category-card :category="category" :height="200" :disable-link="true"/>
    </v-flex>
    <v-flex xs12>
      <list
        :infinite-load="infiniteLoad"
        :infinite-id="infiniteId"
      >
        <template slot="item" slot-scope="{ item }">
          <biography-card2
            v-bind.sync="item"
          ></biography-card2>
        </template>
      </list>
    </v-flex>
  </v-layout>
</template>

<script>
import List from '../components/list/List'
import biographyCategoryService from '../services/biography-category-service'
import BiographyCard2 from '../components/biography/BiographyCard'
import CategoryCard from '../components/category/CategoryCard'

export default {
  data () {
    return {
      infiniteId: +new Date(),
      category: undefined
    }
  },
  props: {
    categoryName: String,
    required: true
  },
  methods: {
    loadCategory () {
      let that = this

      biographyCategoryService.getCategory(this.categoryName)
        .then(
          response => {
            that.category = response.data
          }
        )
    },
    infiniteLoad (limit, offset) {
      return biographyCategoryService.getBiographies(this.categoryName, limit, offset)
    }
  },
  created () {
    this.loadCategory()
  },
  watch: {
    '$route' (to, from) {
      this.loadCategory()
      this.infiniteId += 1
      this.category = {}
    }
  },
  components: {
    List,
    BiographyCard2,
    CategoryCard
  }
}
</script>

<style scoped>

</style>
