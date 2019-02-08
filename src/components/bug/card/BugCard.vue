<template>
  <v-card>
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
export default {
  name: 'BugCard',
  inheritAttrs: false,
  components: { BugActions },
  props: {
    theme: String,
    bugCase: String
  }
}
</script>

<style scoped>

</style>
