<template>
  <v-card-text>
    <span>Биография:</span>
    <tree-view :items="tree" v-bind="$attrs"></tree-view>
    <p class="m-0" v-html="_biography"></p>
    <a :href="biographyLink" class="font-weight-black">Читать дальше</a>
  </v-card-text>
</template>

<script>
import TreeView from '../../tree/TreeView'

const marked = require('marked')
const htmlTruncate = require('html-truncate')

export default {
  name: 'BiographyCardText',
  data () {
    return {
      tree: []
    }
  },
  props: {
    biography: {
      type: String,
      default: ''
    },
    id: {
      type: Number
    }
  },
  computed: {
    biographyLink () {
      return '/biography/' + this.id
    },
    _biography () {
      let biography = this.biography

      if (biography) {
        let renderer = new marked.Renderer()

        let that = this
        let stack = []

        that.tree = []
        let i = 0

        renderer.heading = function (text, level, raw) {
          let nextId = '_' + i++
          let node = {
            id: nextId,
            level: level,
            name: text,
            children: []
          }

          if (level === 1) {
            that.tree.push(node)
            stack.push(node)
          } else {
            let peek = stack[stack.length - 1]

            while (peek.level >= level) {
              stack.pop()
              peek = stack[stack.length - 1]
            }

            peek.children.push(node)
            stack.push(node)
          }

          return '<h' + level + ' id="' + nextId + '">' + text + '</h' + level + '>\n'
        }

        let result = marked(biography, {
          renderer: renderer,
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: false
        })

        return htmlTruncate(result, this.biographyClampSize, undefined)
      }

      return ''
    }
  },
  components: {
    TreeView
  }
}
</script>

<style scoped>

</style>
