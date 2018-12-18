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
    copyModeratorInfo (response, item) {
      item.moderatorBiography = response
      item.moderatorName = response.userName
    },
    reject (item) {
      biographyModerationService.reject(item.id)
        .then(
          () => {
            item.moderationStatus = MODERATION_STATUS.REJECTED
          }
        )
    },
    release (item) {
      biographyModerationService.release(item.id)
        .then(
          () => {
            item.moderatorName = null
            item.moderatorBiography = null
            item.moderationStatus = MODERATION_STATUS.PENDING
          }
        )
    },
    approve (item) {
      biographyModerationService.approve(item.id)
        .then(
          () => {
            item.moderationStatus = MODERATION_STATUS.APPROVED
          }
        )
    },
    assignMe (item) {
      let that = this

      biographyModerationService.assignMe(item.id)
        .then(
          response => {
            that.copyModeratorInfo(response.data, item)
          },
          e => {
            if (e.response.status === 409) {
              that.copyModeratorInfo(e.response.data, item)

              let currentModerator = item.moderatorBiography
              let message = '<a href="\'#/biography/' + currentModerator.id + '">' +
                currentModerator.firstName + ' ' + currentModerator.lastName + '</a>,&nbsp;уже взял биографию на модерацию.'

              that.$store.dispatch('alert/error', message)
            }
          }
        )
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
