<template>
  <v-card-actions>
  <v-layout row wrap>
    <v-flex xs12 v-for="(action, index) in actions" :key="index">
      <moderation-button
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
    ModerationButton
  }
}
</script>

<style scoped>

</style>
