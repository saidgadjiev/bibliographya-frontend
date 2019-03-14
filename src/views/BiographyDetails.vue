<template>
  <v-layout row fill-height justify-center>
    <v-flex shrink v-if="biographyLoading">
      <progress-circular/>
    </v-flex>
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

export default {
  name: 'BiographyDetails',
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
  mounted () {
    this.loadBiography()
  },
  methods: {
    biographyRemoved () {
      this.$router.push('/')
    },
    loadBiography () {
      let that = this

      that.biographyLoading = true
      biographyService.getBiographyById(this.biographyId)
        .then(
          response => {
            that.biography = response.data
          },
          e => {}
        )
        .finally(() => {
          that.biographyLoading = false
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
