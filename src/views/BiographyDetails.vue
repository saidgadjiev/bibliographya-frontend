<template>
  <v-layout row wrap fill-height justify-center>
    <progress-circular v-if="biographyLoading"/>
    <v-flex xs12 v-else>
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
import biographyService from '../services/biography-service'
import BiographyCard from '../components/biography/card/BiographyCard'
import ProgressCircular from '../components/progress/ProgressCircular'
import pullToRefresh from '../mixins/pullToRefresh'

export default {
  name: 'BiographyDetails',
  mixins: [pullToRefresh],
  data () {
    return {
      biographyLoading: true,
      biography: undefined
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
