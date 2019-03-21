<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
    :header-slot="categoryId"
  >
    <template v-if="categoryId" slot="header">
      <category-card :category="category" :height="200" :disable-link="true"/>
    </template>
    <template slot="item" slot-scope="{ item, index }">
      <biography-card2
        v-bind.sync="item"
        biography-clamp
        :biography-clamp-size="_biographyClampSize"
        tree-clamp
        :tree-clamp-size="_treeClampSize"
        @biography-removed="biographyRemoved(index)"
      ></biography-card2>
    </template>
    <template slot="sidebar">
      <side-bar
        @new="applyNewFilter"
        @last-update="applyLastUpdateFilter"
        @autobiographies="applyAutobiographiesFilter"
      ></side-bar>
    </template>
    <template slot="smSidebar">
      <side-list
        @new="applyNewFilter"
        @last-update="applyLastUpdateFilter"
        @autobiographies="applyAutobiographiesFilter"
      ></side-list>
    </template>
    <template slot="no-results">
      <v-card>
        <v-card-text>
          <h4 v-if="categoryId">В этой категории еще нет ни одной биографии.</h4>
          <h4 v-else>Еще биографий нет.</h4>
        </v-card-text>
      </v-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import biographyService from '../services/biography-service'
import biographyCategoryService from '../services/biography-category-service'
import BiographyCard2 from '../components/biography/card/BiographyCard'
import CategoryCard from '../components/category/CategoryCard'
import SideBar from '../components/biography/sidebar/SideBar'
import SideList from '../components/biography/sidebar/SideList'
import { TREE_CLAMP_SIZE, BIOGRAPHY_CLAMP_SIZE } from '../config'

export default {
  name: 'BiographiesList',
  data () {
    return {
      biographyChannel: undefined,
      infiniteId: +new Date(),
      resetId: +new Date(),
      deleteId: +new Date(),
      deleteIndex: -1,
      query: 'sort=created_at,desc',
      autobiographies: undefined,
      category: undefined
    }
  },
  props: {
    categoryId: {
      type: Number
    }
  },
  methods: {
    biographyRemoved (index) {
      this.deleteIndex = index
      ++this.deleteId
    },
    loadCategory () {
      let that = this

      if (this.categoryId) {
        biographyCategoryService.getCategory(this.categoryId)
          .then(
            response => {
              that.category = response.data
            }
          )
      }
    },
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
    infiniteLoad (limit, offset, cancelToken) {
      let query = this.query

      if (this.autobiographies) {
        query += '&autobiographies=true'
      }

      if (this.categoryId) {
        return biographyCategoryService.getBiographies(cancelToken, this.categoryId, limit, offset, query)
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
      } else {
        return biographyService.getBiographies(cancelToken, limit, offset, query)
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
    }
  },
  computed: {
    _treeClampSize () {
      return TREE_CLAMP_SIZE
    },
    _biographyClampSize () {
      return BIOGRAPHY_CLAMP_SIZE
    },
    _smSidebar () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  created () {
    this.loadCategory()
  },
  watch: {
    '$route' (to, from) {
      this.loadCategory()
      this.resetId += 1
    }
  },
  components: {
    SideList,
    SideBar,
    List,
    BiographyCard2,
    CategoryCard
  }
}
</script>

<style scoped>

</style>
