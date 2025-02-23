<template>
  <v-layout row wrap fill-height justify-center>
    <progress-circular v-if="biographyLoading"/>
    <v-flex xs12 v-else-if="biography">
      <biography-card
        live
        show-comments
        v-bind.sync="biography"
        @biography-removed="biographyRemoved"
        mode="read"
      ></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import biographyService from '../services/cache-biography-service'
import BiographyCard from '../components/biography/card/BiographyCard'
import ProgressCircular from '../components/progress/ProgressCircular'
import pullToRefresh from '../mixins/pullToRefresh'
import viewCounterService from '../services/view-counter-service'
import alert from '../mixins/alert'

export default {
  name: 'BiographyDetails',
  mixins: [pullToRefresh, alert],
  data () {
    return {
      biographyLoading: true,
      biography: undefined,
      title: ''
    }
  },
  metaInfo () {
    return {
      title: this.title,
      meta: [
        {
          'property': 'og:title',
          'content': this.title,
          'vmid': 'og:title'
        }
      ]
    }
  },
  props: {
    biographyId: {
      type: Number,
      required: true
    }
  },
  created () {
    let that = this

    that.biographyLoading = true

    let state = {
      complete: function () {
        that.biographyLoading = false
      }
    }

    this.loadBiography(state)
  },
  methods: {
    pullToRefresh (loaded) {
      let state = {
        complete: function () {
          loaded('done')
        }
      }

      this.loadBiography(state)
    },
    biographyRemoved () {
      this.$router.push('/')
    },
    loadBiography ($state) {
      let that = this

      biographyService.getBiographyById(this.biographyId)
        .then(
          response => {
            that.biography = response.data
            that.title = that.biography.firstName + ' ' + that.biography.lastName

            viewCounterService.hit(that.biography.id)
          },
          e => {}
        )
        .finally(() => {
          $state.complete()
        })
    }
  },
  watch: {
    '$route' (to, from) {
      this.biography = undefined
      this.loadBiography()
    }
  },
  components: {
    ProgressCircular,
    BiographyCard
  }
}
</script>

<style scoped>

</style>
