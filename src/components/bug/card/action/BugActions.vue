<template>
  <v-card-actions>
    <v-layout row wrap>
      <v-flex xs12 v-for="(action, index) in actions" :key="index">
        <bug-button v-bind="$attrs" v-on="$listeners" :action="action" :key="action.name"/>
      </v-flex>
    </v-layout>
  </v-card-actions>
</template>

<script>
import BugButton from './BugButton'

export default {
  name: 'BugActions',
  inheritAttrs: false,
  components: { BugButton },
  props: {
    actions: Array
  }
}
</script>

<style scoped>

</style>
