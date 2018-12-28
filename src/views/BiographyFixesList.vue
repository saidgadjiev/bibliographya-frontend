<template>
  <list-with-sidebar
    :infinite-load="infiniteLoad"
    :infinite-id="infiniteId"
    :filter="filter"
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
              <fix-assign-me-button v-if="action.name === 'AssignMe'" v-bind.sync="item" :action="action"/>
              <fix-button v-else v-bind.sync="item" :action="action"/>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </template>
    <template slot="sidebar">
      <biography-fix-sidebar
        @all="applyAllFilter"
        @not-assigned="applyNotAssignedFilter"
        @assigned-me="applyAssignedMeFilter"
        @closed="applyClosedFilter"
      />
    </template>
  </list-with-sidebar>
</template>

<script>
import BiographyFixSidebar from '../components/sidebar/BiographyFixSidebar'
import FixButton from '../components/biography/card/FixButton'
import FixAssignMeButton from '../components/biography/card/FixAssignMeButton.vue'
import BiographyCardActions from '../components/biography/card/BiographyCardActions.vue'
import BiographyCardTitle from '../components/biography/card/BiographyCardTitle'
import BiographyCardText from '../components/biography/card/BiographyCardText'
import biographyFixService from '../services/biography-fix-service'
import BiographyFixTitle from '../components/biography/card/BiographyFixTitle'
import ListWithSidebar from '../components/list/ListWithSidebar'
import { FIX_STATUS } from '../config'
import { mapGetters } from 'vuex'

export default {
  name: 'BiographyFixesList',
  data () {
    return {
      filter: undefined,
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
    applyClosedFilter () {
      this.filter = 'fixerId=eq:' + this.getUser.id + '&status=eq:' + FIX_STATUS.CLOSED
      this.resetList()
    },
    applyNotAssignedFilter () {
      this.filter = 'fixerId=is_null'
      this.resetList()
    },
    applyAllFilter () {
      this.filter = undefined
      this.resetList()
    },
    applyAssignedMeFilter () {
      this.filter = 'fixerId=eq:' + this.getUser.id
      this.resetList()
    },
    infiniteLoad (limit, offset, filter) {
      return biographyFixService.getFixes(limit, offset, filter)
    }
  },
  components: {
    ListWithSidebar,
    BiographyFixTitle,
    BiographyCardText,
    BiographyCardTitle,
    FixButton,
    FixAssignMeButton,
    BiographyFixSidebar,
    BiographyCardActions
  }
}
</script>

<style scoped>

</style>
