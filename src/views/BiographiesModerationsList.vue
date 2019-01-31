<template>
  <list
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
    :infinite-load="infiniteLoad"
  >
    <template slot="item" slot-scope="{ item }">
      <biography-card
        show-moderation-block
        show-moderation-actions
        show-moderator
        v-bind.sync="item"
        biography-clamp
        :biography-clamp-size="_biographyClampSize"
        tree-clamp
        :tree-clamp-size="_treeClampSize"
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
import { MODERATION_STATUS, TREE_CLAMP_SIZE, BIOGRAPHY_CLAMP_SIZE } from '../config'
import SideBar from '../components/moderation/sidebar/SideBar.vue'
import SideList from '../components/moderation/sidebar/SideList.vue'
import { mapGetters } from 'vuex'
import biographyModerationService from '../services/biography-moderation-service'
import List from '../components/list/List'
import BiographyCard from '../components/biography/card/BiographyCard'

export default {
  data () {
    return {
      fab: false,
      filter: undefined,
      resetId: +new Date(),
      infiniteId: +new Date()
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
    },
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    resetList () {
      ++this.resetId
    },
    applyRejectedFilter () {
      this.filter = 'moderator_id==' + this.getUser.id + ';moderation_status==' + MODERATION_STATUS.REJECTED
      this.resetList()
    },
    applyApprovedFilter () {
      this.filter = 'moderator_id==' + this.getUser.id + ';moderation_status==' + MODERATION_STATUS.APPROVED
      this.resetList()
    },
    applyNotAssignedFilter () {
      this.filter = 'moderator_id==null'
      this.resetList()
    },
    applyAllFilter () {
      this.filter = undefined
      this.resetList()
    },
    applyAssignedMeFilter () {
      this.filter = 'moderator_id==' + this.getUser.id
      this.resetList()
    },
    infiniteLoad (limit, offset) {
      return biographyModerationService.getBiographies(limit, offset, this.filter, 'sort=created_at,desc')
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
