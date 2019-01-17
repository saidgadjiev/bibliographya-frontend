<template>
  <div>
    <ol class="mb-0 pl-0">
      <tree-view-node
        v-for="data in tree"
        :key="data.id"
        :items="data">
      </tree-view-node>
    </ol>
    <template v-if="treeClamp">
      <div v-if="_clamped">
        <a @click="treeClamped = false" class="subheading font-weight-bold">Показать содержание...</a>
      </div>
      <div v-else>
        <a @click="treeClamped = true" class="subheading font-weight-bold">Скрыть содержание</a>
      </div>
    </template>
  </div>
</template>

<script>
import TreeViewNode from './TreeViewNode.vue'
import utils from '../../utils'

export default {
  name: 'TreeView',
  data () {
    return {
      treeClamped: true
    }
  },
  props: {
    'treeClamp': {
      type: Boolean,
      default: false
    },
    'treeClampSize': {
      type: Number
    },
    'items': {
      type: Array,
      default: []
    }
  },
  computed: {
    _clamped () {
      if (this.treeClamped) {
        return true
      }

      return false
    },
    tree () {
      if (this.treeClamp && this.treeClamped) {
        return utils.getNTreeLevels(this.items, this.treeClampSize)
      }

      return this.items
    }
  },
  components: {
    TreeViewNode
  }
}
</script>

<style scoped>
  @import '../../../static/css/bibliography.css';
  ol {
    counter-reset: l
  }
</style>
