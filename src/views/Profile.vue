<template>
  <v-layout row fill-height justify-center>
      <progress-circular v-if="biographyLoading"/>
    <v-flex xs12 v-else>
      <alert-message :types="['alert-success']"/>
      <biography-card
        v-bind.sync="biography"
        mode="read"
        :show-publish="_showPublish"
        show-comments
      ></biography-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import alert from '../mixins/alert'
import BiographyCard from '../components/biography/card/BiographyCard'
import userAccountService from '../services/user-account-service'
import viewCounterService from '../services/view-counter-service'
import AlertMessage from '../components/alert/AlertMessage'
import ProgressCircular from '../components/progress/ProgressCircular'
import pullToRefresh from '../mixins/pullToRefresh'
import { TITLE } from '../config'

export default {
  name: 'Profile',
  mixins: [alert, pullToRefresh],
  data () {
    return {
      title: TITLE,
      biographyLoading: true,
      biography: undefined
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
    profileId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'getUserId'
    ]),
    _showPublish () {
      return this.getUserId === this.profileId
    }
  },
  created () {
    this.loadAccount()
  },
  methods: {
    pullToRefresh (loaded) {
      loaded('done')
      this.biographyLoading = true
      this.loadAccount()
    },
    loadAccount () {
      let that = this

      userAccountService.getAccount(this.profileId)
        .then(
          response => {
            that.biography = response.data.biography
            that.title = that.biography.firstName + ' ' + that.biography.lastName
            viewCounterService.hit(that.biography.id)
          },
          e => {
            if (e.response.status === that.HttpStatus.NOT_FOUND) {
              that.$router.push('/404')
            }
          }
        )
        .finally(() => {
          that.biographyLoading = false
        })
    }
  },
  components: {
    ProgressCircular,
    AlertMessage,
    BiographyCard
  },
  watch: {
    '$route' (to, from) {
      this.biographyLoading = true
      this.biography = undefined
      this.loadAccount()
    }
  }
}
</script>

<style scoped>

</style>
