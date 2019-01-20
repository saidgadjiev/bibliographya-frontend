<template>
  <list
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
    :infinite-load="infiniteLoad"
    :filter="filter"
  >
    <template slot="item" slot-scope="{ item }">
      <biography-moderation-card
        v-bind.sync="item"
      ></biography-moderation-card>
    </template>
    <template slot="sidebar">
      <nav-bar
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @approved="applyApprovedFilter"
        @rejected="applyRejectedFilter"
      ></nav-bar>
    </template>
    <template slot="smSidebar">
      <nav-list
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @approved="applyApprovedFilter"
        @rejected="applyRejectedFilter"
      ></nav-list>
    </template>
  </list>
</template>

<script>
import { MODERATION_STATUS } from '../config'
import NavBar from '../components/moderation/nav/NavBar.vue'
import NavList from '../components/moderation/nav/NavList.vue'
import AlertDialog from '../components/alert/AlertDialog'
import { mapGetters } from 'vuex'
import biographyModerationService from '../services/biography-moderation-service'
import BiographyModerationCard from '../components/biography/BiographyModerationCard.vue'
import List from '../components/list/List'

export default {
  data () {
    return {
      fab: false,
      filter: undefined,
      treeClampSize: 1,
      resetId: +new Date(),
      infiniteId: +new Date()
    }
  },
  computed: {
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
    infiniteLoad (limit, offset, filter) {
      return biographyModerationService.getBiographies(limit, offset, filter, 'sort=created_at,desc')
    }
  },
  components: {
    NavBar,
    NavList,
    AlertDialog,
    BiographyModerationCard,
    List
  }
}
</script>

<style scoped>
</style>
