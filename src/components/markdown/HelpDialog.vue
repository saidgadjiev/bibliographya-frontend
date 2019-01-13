<template>
  <v-dialog v-model="_visible" width="600px">
    <v-card>
      <v-card-text>
        <tree-view :items="tree"></tree-view>
        <p class="markdown-body" v-html="helpHtml"></p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import markdown from '../../mixins/markdown'
import TreeView from '../tree/TreeView'

export default {
  name: 'HelpDialog',
  mixins: [markdown],
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
    let $vm = this

    $vm.$render(this.help, function (res, toc) {
      $vm.helpHtml = res
      $vm.tree = toc
    })
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
