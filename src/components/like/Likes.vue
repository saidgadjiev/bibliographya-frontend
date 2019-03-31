<template>
  <v-dialog v-model="_visible" width="400" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-card height="100%">
      <vue-pull-to
        mode="element-scroll"
        :top-load-method="pullToRefresh"
        :bottom-load-method="pullToLoadMore"
      >
        <div>
      <v-card-title class="pb-0">
        <strong style="color: #37474F !important;">Понравилось {{ likesCount }} людям</strong>
        <v-spacer></v-spacer>
        <v-icon small @click="$emit('update:visible', false)">fas fa-times</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-0 pl-0">
        <v-list dense>
          <template v-for="(item, index) in items">
            <v-list-tile :key="'user' + item.id">
              <v-list-tile-content>
                <router-link :to="'/biographies/' + item.id" class="bib-a">
                  <h3>{{ userName(item) }}</h3>
                </router-link>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
          <infinite-loading :identifier="infiniteId" @infinite="load">
            <template slot="spinner">
              <progress-circular/>
            </template>
            <span slot="no-more"></span>
            <span slot="no-results"></span>
            <span slot="error"></span>
          </infinite-loading>
        </v-list>
      </v-card-text>
        </div>
      </vue-pull-to>
    </v-card>
  </v-dialog>
</template>

<script>
import alert from '../../mixins/alert'
import biographyLikeService from '../../services/biography-like-service'
import ProgressCircular from '../progress/ProgressCircular'
import InfiniteLoading from 'vue-infinite-loading'
import VuePullTo from '../pullTo/VuePullTo'

export default {
  name: 'Likes',
  components: { VuePullTo, ProgressCircular, InfiniteLoading },
  mixins: [alert],
  data () {
    return {
      infiniteId: +new Date(),
      limit: 40,
      offset: 0,
      items: []
    }
  },
  props: {
    id: Number,
    likesCount: Number,
    visible: Boolean
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    pullToLoadMore (load) {
      let state = {
        complete: function () {
          load('done')
        },
        loaded: function () {
          load('done')
        }
      }

      this.load(state)
    },
    pullToRefresh (loaded) {
      loaded('done')
      this.reset()
    },
    userName (item) {
      return item.lastName + ' ' + item.firstName
    },
    reset () {
      this.items = []
      this.limit = 40
      this.offset = 0
      ++this.infiniteId
    },
    load ($state) {
      let that = this

      biographyLikeService.getLikes(this.id, this.limit, this.offset)
        .then(
          response => {
            if (response.status === that.HttpStatus.OK) {
              that.items.push(...response.data.content)
              that.offset += response.data.content.length
              $state.loaded()
              that.$emit('update:likesCount', response.data.totalElements)
            } else {
              $state.complete()
            }
          }
        )
    }
  },
  watch: {
    visible (newVal) {
      if (newVal) {
        this.reset()
      }
    }
  }
}
</script>

<style scoped>

</style>
