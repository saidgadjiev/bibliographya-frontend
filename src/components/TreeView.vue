<template>
  <ol>
    <tree-view-node
      v-for="data in items"
      :key="data.id"
      :items="data">
    </tree-view-node>
  </ol>
</template>

<script>
import TreeViewNode from './TreeViewNode.vue'

export default {
  name: 'TreeView',
  props: [
    'items'
  ],
  components: {
    TreeViewNode
  }
}
</script>

<style scoped>
  ol { counter-reset: l }
</style>
