<template>
  <v-layout row wrap justify-center infinite-wrapper>
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
import { mapGetters } from 'vuex'
import sanitize from '../services/sanitize-service'
import InfiniteLoading from 'vue-infinite-loading'
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  data () {
    return {
      loading: false,
      treeClampSize: 1,
      limit: 50,
      offset: 0,
      items: []
    }
  },
  methods: {
    ...mapGetters([
      'getUser'
    ]),
    sanitize (html) {
      return sanitize.sanitizeWithAllowedTags(html)
    },
    infiniteLoad ($state) {
      if (!this.loading) {
        this.loading = true
        let that = this

        biographyService.getMyBiographies(this.limit, this.offset)
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
