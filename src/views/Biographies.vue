<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 offset-sm3 v-for="item in items" :key="item.id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{item.lastName + ' ' + item.firstName + ' ' + item.middleName}}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <p v-html="sanitize(item.biography)"></p>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange" @click="openDetails(item)">Читать дальше</v-btn>
        </v-card-actions>
        <v-divider light></v-divider>
        <v-card-actions class="pl-3">
          <v-btn icon>
            <v-icon color="primary">fas fa-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="primary">fas fa-comment</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-icon color="primary">fas fa-eye</v-icon>
        </v-card-actions>
      </v-card>
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
      this.addBiography(biography)
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
    InfiniteLoading
  }
}
</script>

<style scoped>

</style>
