<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id="infiniteId"
  >
    <template slot="item" slot-scope="{ item }">
      <biography-card2
        v-bind.sync="item"
      ></biography-card2>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/biography/BiographyCard'
import CategoryCard from '../components/category/CategoryCard'

export default {
  data () {
    return {
      biographyChannel: undefined,
      infiniteId: +new Date()
    }
  },
  methods: {
    infiniteLoad (limit, offset) {
      return biographyService.getBiographies(limit, offset)
        .then(
          response => {
            if (response.status === 200) {
              response.data.content.forEach(function (val) {
                val.flex = 12
              })
            }

            return response
          }
        )
    }
  },
  beforeDestroy () {
    this.$pusher.getChannels().forEach(channel => {
      this.$pusher.unsubscribe(channel)
    })
  },
  watch: {
    '$route' (to, from) {
      this.infiniteId += 1
    }
  },
  components: {
    List,
    BiographyCard2,
    CategoryCard
  }
}
</script>

<style scoped>

</style>
