<template>
  <list
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
    :infinite-load="infiniteLoad"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
    :limit="5"
  >
    <template slot="item" slot-scope="{ item, index }">
      <biography-card
        show-moderation-block
        show-moderation-actions
        show-moderator
        v-bind.sync="item"
        biography-clamp
        tree-clamp
        :tree-clamp-size="_treeClampSize"
        @biography-removed="biographyRemoved(index)"
      ></biography-card>
    </template>
    <template slot="sidebar">
      <side-bar
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @approved="applyApprovedFilter"
        @rejected="applyRejectedFilter"
      ></side-bar>
    </template>
    <template slot="smSidebar">
      <side-list
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @approved="applyApprovedFilter"
        @rejected="applyRejectedFilter"
      ></side-list>
    </template>
    <template slot="no-results">
      <v-card>
        <v-card-text>
          Нет данных
        </v-card-text>
      </v-card>
    </template>
  </list>
</template>

<script>
import { MODERATION_STATUS, TREE_CLAMP_SIZE, BIOGRAPHY_CLAMP_SIZE, TITLE } from '../config'
import SideBar from '../components/moderation/sidebar/SideBar.vue'
import SideList from '../components/moderation/sidebar/SideList.vue'
import { mapGetters } from 'vuex'
import biographyModerationService from '../services/biography-moderation-service'
import List from '../components/list/List'
import BiographyCard from '../components/biography/card/BiographyCard'
import pullToRefresh from '../mixins/pullToRefresh'

export default {
  mixins: [pullToRefresh],
  data () {
    return {
      fab: false,
      filter: undefined,
      resetId: +new Date(),
      deleteId: +new Date(),
      deleteIndex: -1,
      infiniteId: +new Date()
    }
  },
  metaInfo: {
    title: TITLE.MODERATION
  },
  computed: {
    _treeClampSize () {
      return TREE_CLAMP_SIZE
    },
    ...mapGetters([
      'getUserId'
    ])
  },
  methods: {
    pullToRefresh (loaded) {
      loaded('done')
      this.resetList()
    },
    biographyRemoved (index) {
      this.deleteIndex = index
      ++this.deleteId
    },
    resetList () {
      ++this.resetId
    },
    applyRejectedFilter () {
      this.filter = 'moderatorId==' + this.getUserId + ';moderationStatus==' + MODERATION_STATUS.REJECTED
      this.resetList()
    },
    applyApprovedFilter () {
      this.filter = 'moderatorId==' + this.getUserId + ';moderationStatus==' + MODERATION_STATUS.APPROVED
      this.resetList()
    },
    applyNotAssignedFilter () {
      this.filter = 'moderatorId==null'
      this.resetList()
    },
    applyAllFilter () {
      this.filter = undefined
      this.resetList()
    },
    applyAssignedMeFilter () {
      this.filter = 'moderatorId==' + this.getUserId
      this.resetList()
    },
    infiniteLoad (limit, offset) {
      return biographyModerationService.getBiographies(limit, offset, BIOGRAPHY_CLAMP_SIZE, this.filter, 'sort=created_at,desc')
    }
  },
  components: {
    BiographyCard,
    SideBar,
    SideList,
    List
  }
}
</script>

<style scoped>
</style>
