<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :reset-id="resetId"
  >
    <template slot="item" slot-scope="{ item }">
      <v-card>
        <biography-fix-title class="pb-0" v-bind="item"/>
        <biography-card-title v-bind="item.biography"/>
        <v-divider></v-divider>
        <biography-card-text v-bind="item.biography"/>
        <v-divider></v-divider>
        <biography-card-actions v-bind.sync="item.biography"/>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12 v-for="(action, index) in item.actions" :key="index">
              <fix-ignore-button v-if="action.name === 'Ignore'" v-bind.sync="item" :action="action"/>
              <fix-assign-me-button v-else-if="action.name === 'AssignMe'" v-bind.sync="item" :action="action"/>
              <fix-button v-else v-bind.sync="item" :action="action"/>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </template>
    <template slot="sidebar">
      <side-bar
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @closed="applyClosedFilter"
      />
    </template>
    <template slot="smSidebar">
      <side-list
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @closed="applyClosedFilter"
      />
    </template>
  </list>
</template>

<script>
import SideBar from '../components/fix/sidebar/SideBar'
import FixButton from '../components/fix/card/FixButton'
import FixAssignMeButton from '../components/fix/card/FixAssignMeButton.vue'
import BiographyCardActions from '../components/biography/card/BiographyCardActions.vue'
import BiographyCardTitle from '../components/biography/card/BiographyCardTitle'
import BiographyCardText from '../components/biography/card/BiographyCardText'
import biographyFixService from '../services/biography-fix-service'
import BiographyFixTitle from '../components/fix/card/BiographyFixTitle'
import List from '../components/list/List'
import { FIX_STATUS } from '../config'
import { mapGetters } from 'vuex'
import FixIgnoreButton from '../components/fix/card/FixIgnoreButton'
import SideList from '../components/fix/sidebar/SideList'

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
      'getUser'
    ])
  },
  methods: {
    resetList () {
      ++this.resetId
    },
    applyClosedFilter () {
      this.filter = 'fixer_id==' + this.getUser.id + ';status==' + FIX_STATUS.CLOSED
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
      this.filter = 'fixer_id==' + this.getUser.id
      this.resetList()
    },
    infiniteLoad (limit, offset) {
      return biographyFixService.getFixes(limit, offset, this.filter)
    }
  },
  components: {
    SideList,
    FixIgnoreButton,
    List,
    BiographyFixTitle,
    BiographyCardText,
    BiographyCardTitle,
    FixButton,
    FixAssignMeButton,
    SideBar,
    BiographyCardActions
  }
}
</script>

<style scoped>

</style>
