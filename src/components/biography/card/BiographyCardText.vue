<template>
  <v-card-text>
    <tree-view :items="tree" v-bind="$attrs"></tree-view>
    <span>Биография:</span>
    <clamp
      ref="biography"
      :source="biography"
      :clamp="biographyClamp"
      :clamp-size="biographyClampSize"
      :clamp-link="_biographyLink"
      clamp-link-label="Читать дальше"
    ></clamp>
  </v-card-text>
</template>

<script>
import TreeView from '../../tree/TreeView'
import Clamp from '../../markdown/HtmlClamp'
import markdown from '../../../mixins/markdown'

export default {
  name: 'BiographyCardText',
  mixins: [markdown],
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
    biographyClamp: {
      type: Boolean,
      default: false
    },
    biographyClampSize: {
      type: Number
    },
    resetIds: {
      type: Boolean,
      default: true
    },
    id: {
      type: Number
    }
  },
  mounted () {
    let children = this.$refs.biography.$el.children[0].children
    let stack = []

    for (let i = 0; i < children.length; ++i) {
      let child = children[i]

      if (/^h[1-9]$/i.test(child.localName)) {
        let level = parseInt(child.nodeName.replace(/^H/i, ''), 10)
        let text = child.textContent
        let id = 'head_' + i

        let node = {
          id: id,
          level: level,
          name: text,
          children: []
        }

        if (level === 1) {
          this.tree.push(node)
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
        child.setAttribute('id', '_' + i)
      }
    }
  },
  computed: {
    _biographyLink () {
      return '/biography/' + this.id
    }
  },
  components: {
    Clamp,
    TreeView
  }
}
</script>

<style scoped>

</style>
