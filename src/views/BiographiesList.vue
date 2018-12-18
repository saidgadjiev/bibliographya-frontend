<template>
  <v-layout column>
    <v-flex xs12>
      <category-card :category="category" :height="200" :disable-link="true"/>
    </v-flex>
    <v-flex xs12>
      <list
        :infinite-load="infiniteLoad"
        :infinite-id="infiniteId"
        :filter="categoryName"
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
import biographyService from '../services/biography-service'
import biographyCategoryService from '../services/biography-category-service'
import BiographyCard2 from '../components/biography/BiographyCard'
import CategoryCard from '../components/category/CategoryCard'

export default {
  data () {
    return {
      infiniteId: +new Date(),
      category: {}
    }
  },
  props: {
    categoryName: String
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
    infiniteLoad (limit, offset, filter) {
      return biographyService.getBiographies(limit, offset, filter)
    }
  },
  created () {
    this.loadCategory()
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('clearBackgroundImage')
    next()
  },
  watch: {
    '$route' (to, from) {
      this.loadCategory()
      this.infiniteId += 1
      this.category = {}
      this.$store.commit('clearBackgroundImage')
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
