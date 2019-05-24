<template>
  <list
    :infinite-load="infiniteLoad"
    :reset-id="resetId"
  >
    <template slot="item" slot-scope="{ item }">
      <category-card
        :category="item"
      ></category-card>
    </template>
    <template slot="no-results">
      <v-card>
        <v-card-text>
          <h4>Еще категорий нет.</h4>
        </v-card-text>
      </v-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import CategoryCard from '../components/category/CategoryCard'
import biographyCategoryService from '../services/cache-biography-category-service'
import pullToRefresh from '../mixins/pullToRefresh'
import { TITLE } from '../config'

export default {
  name: 'CategoriesList',
  mixins: [pullToRefresh],
  data () {
    return {
      resetId: +new Date()
    }
  },
  metaInfo: {
    title: TITLE.LIBRARY
  },
  methods: {
    pullToRefresh (loaded) {
      loaded('done')
      ++this.resetId
    },
    infiniteLoad (limit, offset) {
      let that = this

      return biographyCategoryService.getCategories(limit, offset)
        .then(
          response => {
            if (response.status === 200) {
              response.data.content.forEach(function (val) {
                if (that.$vuetify.breakpoint.mdAndUp) {
                  val.flex = 6
                } else {
                  val.flex = 12
                }
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
