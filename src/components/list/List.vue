<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="headerSlot">
      <slot name="header"></slot>
    </v-flex>
    <v-flex v-bind="{ [`xs${rootFlex}`]: true }">
      <v-layout row wrap justify-center>
        <v-flex xs12 v-if="hasListHeaderSlot">
          <slot name="listHeader"></slot>
        </v-flex>
        <v-flex v-bind="{ [`xs${itemFlex(item)}`]: true }" v-for="(item, index) in items" :key="item.id">
          <slot name="item" v-bind:item="item" v-bind:index="index">
          </slot>
        </v-flex>
        <v-flex xs12 md6>
          <infinite-loading style="width: 100%;" :identifier="infiniteId" @infinite="load">
            <template slot="spinner">
              <progress-circular/>
            </template>
            <div slot="no-more" :style="loadMoreStyles">
              <a @click="loadMore">Показать еще</a>
            </div>
            <div slot="no-results">
              <slot name="no-results"></slot>
            </div>
            <div slot="error" slot-scope="{ trigger }">
              <slot name="error" :trigger="trigger">
                <error-card :trigger="trigger"></error-card>
              </slot>
            </div>
          </infinite-loading>
        </v-flex>
        <v-flex xs12 v-if="hasFooterSlot">
          <slot name="footer"></slot>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs4 v-if="mdSidebar">
      <slot name="sidebar"></slot>
    </v-flex>
    <v-menu content-class="fab-menu" v-if="smSidebar" :close-on-content-click="false">
      <v-btn
        style="z-index: 3;"
        slot="activator"
        color="red darken-2"
        dark
        bottom
        right
        fixed
        fab
        small
      >
        <v-icon small>fas fa-search</v-icon>
      </v-btn>
      <slot name="smSidebar"></slot>
    </v-menu>
  </v-layout>
</template>

<script>
import { CancelToken } from '../../axios/axios'
import ErrorCard from '../error/ErrorCard'
import ProgressCircular from '../progress/ProgressCircular'
import pullToLoadMore from '../../mixins/pullToLoadMore'
import InfiniteLoading from '../infinite/InfiniteLoading'
import axios from 'axios'

export default {
  name: 'List',
  mixins: [pullToLoadMore],
  components: { ProgressCircular, ErrorCard, InfiniteLoading },
  inheritAttrs: false,
  data () {
    return {
      loading: false,
      activeRequest: undefined,
      offset: 0,
      items: []
    }
  },
  props: {
    headerSlot: {
      type: Boolean,
      default: false
    },
    availableMore: {
      type: Boolean,
      default: false
    },
    resetId: {
      type: Number
    },
    addId: {
      type: Number
    },
    newItem: {
      type: Object
    },
    deleteId: {
      type: Number
    },
    deleteIndex: {
      type: Number
    },
    infiniteId: {
      type: Number
    },
    infiniteLoad: {
      type: Function
    },
    limit: {
      type: Number,
      default: 25
    }
  },
  methods: {
    pullToLoadMore (loaded) {
      if (this.isOffline) {
        loaded('done')

        return
      }
      let state = {
        loaded: function () {
          loaded('done')
        },
        complete: function () {
          loaded('done')
        },
        error: function () {
          loaded('done')
        }
      }

      this.load(state)
    },
    itemFlex (item) {
      return item.flex ? item.flex : 12
    },
    loadMore () {
      this.$emit('update:availableMore', false)
      this.$emit('update:infiniteId', this.infiniteId + 1)
    },
    load ($state) {
      if (!this.loading) {
        this.loading = true
        this.activeRequest = CancelToken.source()
        let that = this

        this.infiniteLoad(this.limit, this.offset, this.activeRequest.token)
          .then(
            response => {
              if (response.status === 200) {
                that.items.push(...response.data.content)
                that.offset += response.data.content.length
                $state.loaded()
              } else {
                $state.complete()
                that.activeRequest = undefined
                that.$emit('update:availableMore', false)
              }
              that.loading = false
            },
            e => {
              if (!axios.isCancel(e)) {
                $state.error()
                that.loading = false
              }
            }
          )
      }
    }
  },
  computed: {
    rootFlex () {
      if (this.hasSidebarSlot) {
        return this.$vuetify.breakpoint.mdAndUp ? 8 : 12
      }

      return 12
    },
    mdSidebar () {
      return this.hasSidebarSlot && this.$vuetify.breakpoint.mdAndUp
    },
    smSidebar () {
      return this.hasSmSidebarSlot && this.$vuetify.breakpoint.smAndDown
    },
    hasListHeaderSlot () {
      return !!this.$slots.listHeader
    },
    loadMoreStyles () {
      if (this.availableMore) {
        return {}
      }

      return {
        'display': 'none'
      }
    },
    hasFooterSlot () {
      return !!this.$slots.footer
    },
    hasSidebarSlot () {
      return !!this.$slots.sidebar
    },
    hasSmSidebarSlot () {
      return !!this.$slots.smSidebar
    }
  },
  watch: {
    availableMore () {
      if (this.availableMore && this.items.length === 0) {
        this.loadMore()
      }
    },
    addId () {
      this.items.push(this.newItem)
    },
    deleteId () {
      this.items.splice(this.deleteIndex, 1)

      if (this.items.length === 0) {
        this.$emit('update:infiniteId', this.infiniteId + 1)
      }
    },
    resetId () {
      if (this.activeRequest) {
        this.activeRequest.cancel()
        this.activeRequest = undefined
      }
      this.loading = false
      this.items = []
      this.offset = 0
      window.scrollTo(0, 0)
      this.$emit('update:infiniteId', this.infiniteId + 1)
    }
  }
}
</script>

<style scoped>
  .fab-menu {
    min-width: 200px !important;
    position: fixed !important;
    bottom: 80px !important;
    right: 50px !important;
    top: unset !important;
    left: unset !important;
  }
</style>
