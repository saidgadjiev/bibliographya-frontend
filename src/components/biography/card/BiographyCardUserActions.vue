<template>
  <v-card-actions>
  <v-layout row wrap>
    <v-flex xs12 v-for="(action, index) in actions" :key="index">
      <moderation-user-button
        v-bind="$attrs"
        v-on="$listeners"
        :key="action.name"
        :action="action"
      ></moderation-user-button>
    </v-flex>
  </v-layout>
  </v-card-actions>
</template>

<script>
import { mapGetters } from 'vuex'
import ModerationUserButton from './ModerationUserButton'

export default {
  name: 'BiographyModerationCardActions',
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  props: {
    moderatorId: {
      type: String
    },
    actions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    ModerationUserButton
  }
}
</script>

<style scoped>

</style>
