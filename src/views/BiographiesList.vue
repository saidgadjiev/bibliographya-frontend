<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <v-layout row wrap justify-center v-for="item in items" :key="item.id">
        <v-flex xs12 md6>
          <biography-card2
            biography-clamp
            :biography-clamp-size=150
            tree-clamp
            :tree-clamp-size=treeClampSize
            show-actions
            show-menu
            :biography="item"
            v-bind="$attrs"
          >
          </biography-card2>
        </v-flex>
      </v-layout>
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
import sanitize from '../services/sanitize-service'
import InfiniteLoading from 'vue-infinite-loading'
import biographyService from '../services/biography-service'
import biographyCategoryService from '../services/biography-category-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  data () {
    return {
      treeClampSize: 1,
      limit: 50,
      offset: 0,
      items: [],
      category: {}
    }
  },
  props: {
    categoryName: String,
    filter: {
      type: String
    }
  },
  methods: {
    sanitize (html) {
      return sanitize.sanitizeWithAllowedTags(html)
    },
    infiniteLoad ($state) {
      let that = this

      biographyService.getBiographies(this.limit, this.offset, this.filter, this.categoryName)
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
  created () {
    let that = this

    biographyCategoryService.getCategory(this.categoryName)
      .then(
        response => {
          this.$store.commit('setBackgroundImage', response.data.imagePath)

          that.category = response.data
        }
      )
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('clearBackgroundImage')
    next()
  },
  components: {
    InfiniteLoading,
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
