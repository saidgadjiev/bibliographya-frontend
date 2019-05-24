<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
    :header-slot="categoryId"
  >
    <template #listHeader v-if="$vuetify.breakpoint.smAndDown">
      <v-text-field
        hide-details
        solo
        flat
        light
        placeholder="Поиск"
        single-line
        height="30"
        class="search-field ml-2 mr-2"
        v-model="searchQuery"
        @input="_throttleSearch"
      >
        <template #prepend-inner>
          <v-icon small color="blue darken-3">fas fa-search</v-icon>
        </template>
      </v-text-field>
    </template>
    <template v-if="categoryId" slot="header">
      <category-card :category="category" :height="200" :disable-link="true"/>
    </template>
    <template slot="item" slot-scope="{ item, index }">
      <biography-card2
        v-bind.sync="item"
        biography-clamp
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
          <h4>Еще биографий нет.</h4>
        </v-card-text>
      </v-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import biographyService from '../services/cache-biography-service'
import biographyCategoryService from '../services/cache-biography-category-service'
import BiographyCard2 from '../components/biography/card/BiographyCard'
import CategoryCard from '../components/category/CategoryCard'
import SideBar from '../components/biography/sidebar/SideBar'
import SideList from '../components/biography/sidebar/SideList'
import { TREE_CLAMP_SIZE, BIOGRAPHY_CLAMP_SIZE } from '../config'
import pullToRefresh from '../mixins/pullToRefresh'
import search from '../mixins/search'
import utils from '../assets/js/utils'

export default {
  name: 'BiographiesList',
  mixins: [pullToRefresh, search],
  data () {
    return {
      biographyChannel: undefined,
      infiniteId: +new Date(),
      resetId: +new Date(),
      deleteId: +new Date(),
      deleteIndex: -1,
      sort: 'sort=created_at,desc',
      autobiographies: undefined,
      category: undefined,
      searchQuery: undefined
    }
  },
  metaInfo () {
    return {
      title: 'Биографии'
    }
  },
  props: {
    categoryId: {
      type: Number
    }
  },
  methods: {
    doSearch (query) {
      this.searchQuery = query
      ++this.resetId
    },
    pullToRefresh (loaded) {
      loaded('done')

      if (this.isOnline) {
        ++this.resetId
      }
    },
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
      this.sort = 'sort=created_at,desc'
    },
    applyLastUpdateFilter () {
      ++this.resetId
      this.sort = 'sort=updated_at,desc&sort=created_at,desc'
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
      if (this.categoryId) {
        return biographyCategoryService.getBiographies(cancelToken,
          this.categoryId,
          limit,
          offset,
          this.autobiographies,
          BIOGRAPHY_CLAMP_SIZE,
          this.searchQuery,
          this.sort
        )
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
        return biographyService.getBiographies(cancelToken, limit, offset, this.autobiographies, BIOGRAPHY_CLAMP_SIZE, this.searchQuery, this.sort)
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
    _throttleSearch () {
      let that = this

      return utils.throttle(function () {
        ++that.resetId
      }, 300)
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

  .search-field >>> .v-input__control {
    min-height: unset !important;
  }

  .search-field >>> .v-input__slot {
    border-radius: 30px !important;
  }

</style>
