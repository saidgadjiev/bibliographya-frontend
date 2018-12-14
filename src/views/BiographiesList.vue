<template>
  <v-layout row wrap justify-center infinite-wrapper>
    <assign-me-conflict-dialog
      :biography="conflictBiography"
      :visible.sync="conflictDialogVisible"
    ></assign-me-conflict-dialog>
    <v-flex xs12 md8 v-for="item in items" :key="item.id">
      <biography-card2
        biography-clamp
        :biography-clamp-size=150
        tree-clamp
        :tree-clamp-size=treeClampSize
        show-actions
        show-menu
        :in-biography="item"
        :category-name="categoryName"
        v-on:update:likesCount="item.likesCount = $event"
        v-on:update:commentsCount="item.commentsCount = $event"
        v-on:update:liked="item.liked = $event"
        v-bind="$attrs"
      >
      </biography-card2>
    </v-flex>
    <infinite-loading :identifier="infiniteId" @infinite="infiniteLoad" :force-use-infinite-wrapper="true">
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
import sanitize from '../services/sanitize-service'
import InfiniteLoading from 'vue-infinite-loading'
import biographyService from '../services/biography-service'
import biographyCategoryService from '../services/biography-category-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  data () {
    return {
      conflictDialogVisible: false,
      conflictBiography: {},
      loading: false,
      treeClampSize: 1,
      limit: 50,
      offset: 0,
      items: [],
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
            this.$store.commit('setBackgroundImage', response.data.imagePath)

            that.category = response.data
          }
        )
    },
    sanitize (html) {
      return sanitize.sanitizeWithAllowedTags(html)
    },
    infiniteLoad ($state) {
      if (!this.loading) {
        this.loading = true
        let that = this

        biographyService.getBiographies(this.limit, this.offset, this.categoryName)
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
      this.items = []
      this.infiniteId += 1
      this.offset = 0
      this.category = {}
      this.$store.commit('clearBackgroundImage')
    }
  },
  components: {
    InfiniteLoading,
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
