<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 v-for="item in items" :key="item.id">
      <biography-card2
        :truncate="150"
        :tree-size="treeSize"
        :biography="item"
      >
        <div slot="treeClamp" v-if="treeSize">
          <a href="#" @click="treeSize = undefined">Показать содержание</a>
        </div>
        <div slot="treeClamp" v-else>
          <a href="#" @click="treeSize = 1">Скрыть содержание</a>
        </div>
        <div slot="biographyClamp"  class="mt-3">
          <a :href="'#/biography/' + item.id">Читать дальше</a>
        </div>
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
import BiographyCard2 from '../components/BiographyCard'

export default {
  data () {
    return {
      treeSize: 1,
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
