<template>
  <v-layout fill-height>
    <v-flex xs8>
      <v-layout row wrap justify-center infinite-wrapper fill-height>
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
            <template slot="actions" v-if="item.moderatorName === getUser.name">
              <v-layout
                row
                wrap
                v-if="item.moderationStatus === 0"
              >
                <v-flex xs6>
                  <v-btn
                    block
                    @click="approve(item)"
                    color="primary"
                  >Принять</v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn
                    block
                    @click="reject(item)"
                    color="primary"
                  >Отклонить</v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-btn
                    block
                    color="primary"
                    @click="release(item)"
                  >Вернуть</v-btn>
                </v-flex>
              </v-layout>
              <v-layout
                v-else-if="item.moderationStatus === 1"
              >
                <v-flex xs6>
                  <v-btn
                    block
                    color="primary"
                    @click="reject(item)"
                  >Отклонить</v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn
                    block
                    color="primary"
                    @click="release(item)"
                  >Вернуть</v-btn>
                </v-flex>
              </v-layout>
              <v-layout
                v-else-if="item.moderationStatus === 2"
              >
                <v-flex xs6>
                  <v-btn
                    block
                    color="primary"
                    @click="approve(item)"
                  >Принять</v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-btn
                    block
                    color="primary"
                    @click="release(item)"
                  >Вернуть</v-btn>
                </v-flex>
              </v-layout>
            </template>
            <template slot="actions" v-else-if="!item.moderatorName">
              <v-btn
                block
                @click="assignMe(item)"
                color="primary"
              >Назначить мне</v-btn>
            </template>
          </biography-card2>
        </v-flex>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteLoad" :force-use-infinite-wrapper="true">
          <template slot="spinner">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>
          <div slot="no-more" style="display: none"></div>
          <div slot="no-results" style="display: none"></div>
          <div slot="error" style="display: none"></div>
        </infinite-loading>
      </v-layout>
    </v-flex>
    <v-flex xs4>
      <nav-bar
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @approved="applyApprovedFilter"
        @rejected="applyRejectedFilter"
      ></nav-bar>
    </v-flex>
  </v-layout>
</template>

<script>
import AlertDialog from '../components/alert/AlertDialog'
import { mapGetters } from 'vuex'
import biographyFixService from '../services/biography-fix-service'
import BiographyCard2 from '../components/biography/BiographyCard'

export default {
  name: 'BiographyFix',
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
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    resetList () {
      this.items = []
      this.offset = 0
      ++this.infiniteId
    },
    infiniteLoad ($state) {
      if (!this.loading) {
        this.loading = true
        let that = this

        biographyFixService.getBiographies(this.limit, this.offset, this.filter)
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
  components: {
    AlertDialog,
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
