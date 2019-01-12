<template>
  <v-dialog v-model="_visible" width="600px">
    <v-card>
      <v-card-text>
        <tree-view :items="tree"></tree-view>
        <p v-html="helpHtml"></p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import markdown from '../../markdown/markdown'
import TreeView from '../tree/TreeView'

export default {
  name: 'HelpDialog',
  components: { TreeView },
  data () {
    return {
      helpHtml: '',
      tree: []
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    help: {
      type: String,
      default: ''
    }
  },
  created () {
    this.helpHtml = markdown.markdownItWithToc(this.help, this.tree)
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>

<style scoped>
</style>
