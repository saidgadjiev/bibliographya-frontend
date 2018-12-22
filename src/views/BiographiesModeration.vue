<template>
  <list-with-sidebar
    :infinite-id="infiniteId"
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
  </list-with-sidebar>
</template>

<script>
import { MODERATION_STATUS } from '../config'
import NavBar from '../components/moderation/NavBar.vue'
import AlertDialog from '../components/alert/AlertDialog'
import { mapGetters } from 'vuex'
import biographyModerationService from '../services/biography-moderation-service'
import BiographyModerationCard from '../components/biography/BiographyModerationCard.vue'
import ListWithSidebar from '../components/list/ListWithSidebar'

export default {
  data () {
    return {
      filter: undefined,
      treeClampSize: 1,
      infiniteId: +new Date()
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    resetList () {
      ++this.infiniteId
    },
    applyRejectedFilter () {
      this.filter = 'moderatorName=eq:' + this.getUser.name + '&moderationStatus=eq:' + MODERATION_STATUS.REJECTED
      this.resetList()
    },
    applyApprovedFilter () {
      this.filter = 'moderatorName=eq:' + this.getUser.name + '&moderationStatus=eq:' + MODERATION_STATUS.APPROVED
      this.resetList()
    },
    applyNotAssignedFilter () {
      this.filter = 'moderatorName=is_null'
      this.resetList()
    },
    applyAllFilter () {
      this.filter = undefined
      this.resetList()
    },
    applyAssignedMeFilter () {
      this.filter = 'moderatorName=eq:' + this.getUser.name
      this.resetList()
    },
    infiniteLoad (limit, offset, filter) {
      return biographyModerationService.getBiographies(limit, offset, filter)
    }
  },
  components: {
    NavBar,
    AlertDialog,
    BiographyModerationCard,
    ListWithSidebar
  }
}
</script>

<style scoped>

</style>
