<template>
  <v-card-actions>
    <v-layout row wrap>
      <v-flex xs12 v-for="(action, index) in actions" :key="index">
        <bug-action-assign-me v-if="action.name === 'AssignMe'" v-bind="$attrs" v-on="$listeners" :action="action" :key="action.name"/>
        <bug-action-ignore v-else-if="action.name === 'Ignore'" v-bind="$attrs" v-on="$listeners" :action="action" :key="action.name"/>
        <bug-action v-else v-bind="$attrs" v-on="$listeners" :action="action" :key="action.name"/>
      </v-flex>
    </v-layout>
  </v-card-actions>
</template>

<script>
import BugAction from './BugAction'
import BugActionAssignMe from './BugActionAssignMe'
import BugActionIgnore from './BugActionIgnore'
export default {
  name: 'BugActions',
  inheritAttrs: false,
  components: { BugActionIgnore, BugActionAssignMe, BugAction },
  props: {
    actions: Array
  }
}
</script>

<style scoped>

</style>
