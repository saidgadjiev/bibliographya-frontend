<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 v-for="item in items" :key="item.id">
      <biography-card2
        biography-clamp
        :biography-clamp-size=150
        tree-clamp
        :tree-clamp-size=treeClampSize
        show-actions
        show-menu
        show-moderation-block
        show-moderator
        show-moderation-status
        :in-biography="item"
        v-on:update:likesCount="item.likesCount = $event"
        v-on:update:commentsCount="item.commentsCount = $event"
        v-on:update:liked="item.liked = $event"
        v-bind="$attrs"
      >
        <template slot="actions" v-if="!item.moderatorName">
          <v-btn block @click="assignMe(item)" color="primary">Назначить мне</v-btn>
        </template>
      </biography-card2>
    </v-flex>
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
  </v-layout>
</template>

<script>
import NavBar from '../components/moderation/NavBar.vue'
import AlertDialog from '../components/alert/AlertDialog'
import { mapGetters } from 'vuex'
import sanitize from '../services/sanitize-service'
import InfiniteLoading from 'vue-infinite-loading'
import biographyModerationService from '../services/biography-moderation-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  data () {
    return {
      filter: undefined,
      loading: false,
      treeClampSize: 1,
      limit: 50,
      offset: 0,
      items: [],
      infiniteId: +new Date()
    }
  },
  mounted () {
    console.log('Mounted')
  },
  methods: {
    ...mapGetters([
      'getUser'
    ]),
    applyAssignedMeFilter () {
      this.items = []
      this.filter = 'moderatorName=eq:' + this.getUser().name
      this.offset = 0
      ++this.infiniteId
    },
    copyModeratorInfo (response, item) {
      item.moderatorBiography = response
      item.moderatorName = response.userName
    },
    assignMe (item) {
      let that = this

      biographyModerationService.assignMe(item.id)
        .then(
          response => {
            that.copyModeratorInfo(response.data, item)
          },
          e => {
            if (e.response.status === 409) {
              that.copyModeratorInfo(e.response.data, item)

              let currentModerator = item.moderatorBiography
              let message = '<a href="\'#/biography/' + currentModerator.id + '">' +
                currentModerator.firstName + ' ' + currentModerator.lastName + '</a>,&nbsp;уже взял биографию на модерацию.'

              that.$store.dispatch('alert/error', message)
            }
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

        biographyModerationService.getBiographies(this.limit, this.offset, this.filter)
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
    next()
  },
  components: {
    NavBar,
    AlertDialog,
    InfiniteLoading,
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
