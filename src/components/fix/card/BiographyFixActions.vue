<template>
  <v-card-actions v-if="actions.length > 0">
    <v-layout row wrap>
      <v-flex xs12 v-for="(action, index) in actions" :key="index">
        <fix-button v-bind.sync="$attrs" v-on="$listeners" :action="action"/>
      </v-flex>
    </v-layout>
  </v-card-actions>
</template>

<script>
import FixButton from './FixButton'
export default {
  name: 'BiographyFixActions',
  inheritAttrs: false,
  components: { FixButton },
  props: {
    actions: Array,
    default: () => []
  }
}
</script>

<style scoped>

</style>
