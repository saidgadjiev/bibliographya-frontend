<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
  >
    <template slot="item" slot-scope="{ item }">
      <biography-card2
        v-bind.sync="item"
        biography-clamp
        :biography-clamp-size="biographyClampSize"
        tree-clamp
        :tree-clamp-size="treeClampSize"
      ></biography-card2>
    </template>
    <template slot="sidebar">
      <sidebar
        @new="applyNewFilter"
        @last-update="applyLastUpdateFilter"
        @autobiographies="applyAutobiographiesFilter"
      ></sidebar>
    </template>
    <template slot="smSidebar">
      <side-list
        @new="applyNewFilter"
        @last-update="applyLastUpdateFilter"
        @autobiographies="applyAutobiographiesFilter"
      ></side-list>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import biographyService from '../services/biography-service'
import BiographyCard2 from '../components/biography/BiographyCard'
import CategoryCard from '../components/category/CategoryCard'
import Sidebar from '../components/biography/sidebar/Sidebar'
import SideList from '../components/biography/sidebar/SideList'

export default {
  data () {
    return {
      treeClampSize: 1,
      biographyClampSize: 150,
      biographyChannel: undefined,
      infiniteId: +new Date(),
      resetId: +new Date(),
      query: 'sort=created_at,desc',
      autobiographies: undefined
    }
  },
  methods: {
    applyNewFilter () {
      ++this.resetId
      this.query = 'sort=created_at,desc'
    },
    applyLastUpdateFilter () {
      ++this.resetId
      this.query = 'sort=updated_at,desc&sort=created_at,desc'
    },
    applyAutobiographiesFilter (val) {
      if (val) {
        this.autobiographies = val
      } else {
        this.autobiographies = undefined
      }
      ++this.resetId
    },
    infiniteLoad (limit, offset) {
      let query = this.query

      if (this.autobiographies) {
        query += '&autobiographies=true'
      }

      return biographyService.getBiographies(limit, offset, query)
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
  computed: {
    _smSidebar () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    '$route' (to, from) {
      this.infiniteId += 1
    }
  },
  components: {
    SideList,
    Sidebar,
    List,
    BiographyCard2,
    CategoryCard
  }
}
</script>

<style scoped>

</style>
