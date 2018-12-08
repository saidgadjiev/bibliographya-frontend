<template>
  <li>
    <a v-if="items.id" @click="$vuetify.goTo('#' + items.id, options)">{{ items.name }}</a>
    <span v-else>{{ items.name }}</span>
    <ol>
      <tree-view-node
        v-for="children in items.children"
        :key="children.id"
        :items="children">
      </tree-view-node>
    </ol>
  </li>
</template>

<script>
export default {
  name: 'TreeViewNode',
  data () {
    return {
      options: {
        duration: 300,
        offset: -100,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: [
    'items'
  ]
}
</script>

<style scoped>
  @import '../../../static/bibliography.css';

  ol {
    counter-reset: l
  }

  li {
    display: block
  }

  li:before {
    content: counters(l, ".") ".";
    counter-increment: l
  }
</style>
