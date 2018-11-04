<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 v-for="item in items" :key="item.id">
      <biography-card2
        :biography="item"
      >
        <div slot="biographyClamp"  class="mt-3">
          <a :href="'#/biography/' + item.id">Читать дальше</a>
        </div>
        <template slot="actions">
          <v-divider class="m-0"></v-divider>
          <v-card-actions>
            <v-btn icon>
              <v-icon color="primary" style="font-size:20px">fas fa-heart</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-icon color="primary" style="font-size:14px">fas fa-eye</v-icon>
          </v-card-actions>
        </template>
      </biography-card2>
    </v-flex>
    <infinite-loading @infinite="infiniteLoad">
      <div slot="spinner">
        <i class="fa fa-spinner fa-pulse" style="font-size:36px;color: #1565c0;"></i>
      </div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import sanitize from '../services/sanitize-service'
import InfiniteLoading from 'vue-infinite-loading'
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/BiographyCard2'

export default {
  data () {
    return {
      page: 0,
      items: []
    }
  },
  methods: {
    ...mapActions([
      'addBiography'
    ]),
    openDetails (biography) {
      this.$router.push('/biography/' + biography.id)
    },
    sanitize (html) {
      return sanitize.sanitize(html)
    },
    infiniteLoad ($state) {
      let that = this

      biographyService.getBiographies(this.page)
        .then(
          response => {
            if (response.status === 200) {
              ++that.page
              that.items.push(...response.data.content)
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
