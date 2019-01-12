<template>
  <div>
    <tree-view
      :
    ></tree-view>
    <slot></slot>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import TreeView from '../tree/TreeView'

export default {
  name: 'Markdown',
  components: { TreeView },
  md: undefined,
  data () {
    return {
      tree: []
    }
  },
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  created () {
    this.md = new MarkdownIt()
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)
  },
  computed: {
    _source () {
      let renderer = new marked.Renderer()

      let stack = []
      let that = this
      let i = 0
    }
  }
}
</script>

<style scoped>

</style>
