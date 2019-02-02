<template>
  <v-card-actions>
  <v-layout row wrap>
    <v-flex xs12 v-for="(action, index) in actions" :key="index">
      <moderation-reject-button
        v-if="action.name === 'Reject'"
        v-bind="$attrs"
        v-on="$listeners"
        :key="action.name"
        :action="action"
      />
      <moderation-assign-me-button
        v-else-if="action.name === 'AssignMe'"
        v-bind="$attrs"
        v-on="$listeners"
        :key="action.name"
        :action="action"
      />
      <moderation-button
        v-else
        v-bind="$attrs"
        v-on="$listeners"
        :key="action.name"
        :action="action"
      />
    </v-flex>
  </v-layout>
  </v-card-actions>
</template>

<script>
import { mapGetters } from 'vuex'
import ModerationButton from './ModerationButton'
import ModerationRejectButton from './ModerationRejectButton'
import ModerationAssignMeButton from './ModerationAssignMeButton'

export default {
  name: 'BiographyModerationCardActions',
  inheritAttrs: false,
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  props: {
    moderatorId: {
      type: Number
    },
    actions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    ModerationButton,
    ModerationRejectButton,
    ModerationAssignMeButton
  }
}
</script>

<style scoped>

</style>
