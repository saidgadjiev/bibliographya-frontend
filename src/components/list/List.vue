<template>
  <v-layout fill-height>
    <v-flex xs12>
      <v-layout row wrap justify-center infinite-wrapper fill-height>
        <v-flex v-bind="{ [`xs${item.flex ? item.flex : 12}`]: true }" v-for="(item, index) in items" :key="item.id">
          <slot name="item" v-bind:item="item" v-bind:index="index">
          </slot>
        </v-flex>
        <infinite-loading :identifier="infiniteId" @infinite="load" :force-use-infinite-wrapper="true">
          <template slot="spinner">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>
          <div slot="no-more" :style="loadMoreStyles">
            <a @click="loadMore">Показать еще</a>
          </div>
          <div slot="no-results" style="display: none"></div>
          <div slot="error" style="display: none"></div>
        </infinite-loading>
        <v-flex xs12>
          <slot name="footer"></slot>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      loading: false,
      limit: 50,
      offset: 0,
      items: []
    }
  },
  props: {
    availableMore: {
      type: Boolean,
      default: false
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
    filter: {
      type: String
    }
  },
  methods: {
    loadMore () {
      this.$emit('update:infiniteId', this.infiniteId + 1)
    },
    load ($state) {
      if (!this.loading) {
        this.loading = true
        let that = this

        this.infiniteLoad(this.limit, this.offset, this.filter, this.items[this.ite])
          .then(
            response => {
              if (response.status === 200) {
                that.items.push(...response.data.content)
                that.offset += response.data.content.length
                $state.loaded()
              } else {
                $state.complete()
                that.$emit('update:availableMore', false)
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
  computed: {
    loadMoreStyles () {
      if (this.availableMore) {
        return {}
      }

      return {
        'display': 'none'
      }
    }
  },
  watch: {
    addId () {
      this.items.push(this.newItem)
    },
    deleteId () {
      this.items.splice(this.deleteIndex, 1)
    },
    infiniteId () {
      this.items = []
      this.offset = 0
    }
  }
}
</script>

<style scoped>

</style>
