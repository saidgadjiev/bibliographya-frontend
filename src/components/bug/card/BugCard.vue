<template>
  <v-card>
    <bug-fix-title v-bind="$attrs" class="pb-0"/>
    <v-card-title>
      <h2>{{ theme }}</h2>
    </v-card-title>
    <v-card-text class="pt-0">
      <span class="font-weight-regular title">{{ bugCase }}</span>
    </v-card-text>
    <bug-actions v-bind="$attrs" v-on="$listeners"/>
  </v-card>
</template>

<script>
import BugActions from './action/BugActions'
import BugFixTitle from './BugFixTitle'
export default {
  name: 'BugCard',
  inheritAttrs: false,
  components: { BugFixTitle, BugActions },
  props: {
    theme: String,
    bugCase: String
  }
}
</script>

<style scoped>

</style>
