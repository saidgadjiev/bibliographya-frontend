<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 v-for="item in items" :key="item.id">
      <biography-card2
        biography-clamp
        :biography-clamp-size=150
        tree-clamp
        :tree-clamp-size=treeClampSize
        show-actions
        show-menu
        :biography="item"
      >
      </biography-card2>
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
import { mapActions } from 'vuex'
import sanitize from '../services/sanitize-service'
import InfiniteLoading from 'vue-infinite-loading'
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  data () {
    return {
      treeClampSize: 1,
      limit: 50,
      offset: 0,
      items: []
    }
  },
  methods: {
    ...mapActions([
      'addBiography'
    ]),
    showTree () {
      this.treeSize = undefined
    },
    sanitize (html) {
      return sanitize.sanitizeWithAllowedTags(html)
    },
    infiniteLoad ($state) {
      let that = this

      biographyService.getBiographies(this.limit, this.offset)
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
    InfiniteLoading,
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
