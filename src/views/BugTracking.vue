<template>
    <list
      :infinite-load="infiniteLoad"
      :reset-id="resetId"
      :infinite-id.sync="infiniteId"
    >
      <template slot="item" slot-scope="{ item }">
        <bug-card
          v-bind.sync="item"
        ></bug-card>
      </template>
      <template slot="sidebar">
        <side-bar
          @all="applyAllFilter"
          @not-assigned="applyNotAssignedFilter"
          @assigned-me="applyAssignedMeFilter"
          @closed="applyClosedFilter"
          @ignored="applyIgnoredFilter"
        ></side-bar>
      </template>
      <template slot="smSidebar">
        <side-list
          @all="applyAllFilter"
          @not-assigned="applyNotAssignedFilter"
          @assigned-me="applyAssignedMeFilter"
          @closed="applyClosedFilter"
          @ignored="applyIgnoredFilter"
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
import List from '../components/list/List'
import SideBar from '../components/bug/sidebar/SideBar'
import BugCard from '../components/bug/card/BugCard'
import bugTrackingService from '../services/bug-tracking-service'
import SideList from '../components/bug/sidebar/SideList'
import { BUG_STATUS } from '../config'
import { mapGetters } from 'vuex'

export default {
  name: 'BugTracking',
  data () {
    return {
      query: undefined,
      resetId: +new Date(),
      infiniteId: +new Date()
    }
  },
  components: { SideList, BugCard, SideBar, List },
  computed: {
    ...mapGetters([
      'getUserId'
    ])
  },
  methods: {
    resetList () {
      ++this.resetId
    },
    applyAllFilter () {
      this.query = undefined
      this.resetList()
    },
    applyNotAssignedFilter () {
      this.query = 'fixer_id==null'
      this.resetList()
    },
    applyAssignedMeFilter () {
      this.query = 'status==' + BUG_STATUS.PENDING + ';fixer_id==' + this.getUserId
      this.resetList()
    },
    applyClosedFilter () {
      this.query = 'status==' + BUG_STATUS.CLOSED + ';fixer_id==' + this.getUserId
      this.resetList()
    },
    applyIgnoredFilter () {
      this.query = 'status==' + BUG_STATUS.IGNORED + ';fixer_id==' + this.getUserId
      this.resetList()
    },
    infiniteLoad (limit, offset) {
      return bugTrackingService.getBugsTracking(limit, offset, this.query)
    }
  }
}
</script>

<style scoped>

</style>
