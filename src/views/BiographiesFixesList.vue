<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
  >
    <template slot="item" slot-scope="{ item }">
      <biography-fix-card v-bind.sync="item"/>
    </template>
    <template slot="sidebar">
      <side-bar
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @closed="applyClosedFilter"
        @ignored="applyIgnoredFilter"
      />
    </template>
    <template slot="smSidebar">
      <side-list
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @closed="applyClosedFilter"
        @ignored="applyIgnoredFilter"
      />
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
import SideBar from '../components/fix/sidebar/SideBar'
import biographyFixService from '../services/biography-fix-service'
import List from '../components/list/List'
import SideList from '../components/fix/sidebar/SideList'

import { FIX_STATUS, BIOGRAPHY_CLAMP_SIZE } from '../config'
import { mapGetters } from 'vuex'
import BiographyFixCard from '../components/fix/card/BiographyFixCard'

export default {
  name: 'BiographiesFixesList',
  data () {
    return {
      filter: undefined,
      resetId: +new Date(),
      infiniteId: +new Date()
    }
  },
  computed: {
    ...mapGetters([
      'getUserId'
    ])
  },
  methods: {
    resetList () {
      ++this.resetId
    },
    applyIgnoredFilter () {
      this.filter = 'fixer_id==' + this.getUserId + ';status==' + FIX_STATUS.IGNORED
      this.resetList()
    },
    applyClosedFilter () {
      this.filter = 'fixer_id==' + this.getUserId + ';status==' + FIX_STATUS.CLOSED
      this.resetList()
    },
    applyNotAssignedFilter () {
      this.filter = 'fixer_id==null'
      this.resetList()
    },
    applyAllFilter () {
      this.filter = undefined
      this.resetList()
    },
    applyAssignedMeFilter () {
      this.filter = 'fixer_id==' + this.getUserId
      this.resetList()
    },
    infiniteLoad (limit, offset) {
      return biographyFixService.getFixes(limit, offset, BIOGRAPHY_CLAMP_SIZE, this.filter)
    }
  },
  components: {
    BiographyFixCard,
    SideList,
    List,
    SideBar
  }
}
</script>

<style scoped>

</style>
