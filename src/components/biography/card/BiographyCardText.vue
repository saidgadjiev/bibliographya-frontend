<template>
  <v-card-text>
    <toc
      v-if="_showToc"
      :headers="tocHeaders"
      v-bind="$attrs"
    ></toc>
    <clamp
      v-if="biography"
      ref="biography"
      :source="biography"
      :clamp="biographyClamp"
      :clamp-size="biographyClampSize"
      :clamp-link="_biographyLink"
      clamp-link-label="Читать дальше..."
    ></clamp>
  </v-card-text>
</template>

<script>
import Clamp from '../HtmlClamp'
import Toc from '../Toc'

export default {
  name: 'BiographyCardText',
  inheritAttrs: false,
  data () {
    return {
      tocHeaders: []
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
    id: {
      type: Number
    }
  },
  mounted () {
    if (this.biography) {
      let children = this.$refs.biography.$el.children[0].children
      let headers = []

      this.getHeaders(children, headers, this.guid('head_'))

      this.tocHeaders = headers
    }
  },
  methods: {
    guid (prefix) {
      let counter = 0
      return function () {
        return prefix + counter++
      }
    },
    getHeaders (root, headers, guid) {
      for (let i = 0; i < root.length; ++i) {
        let child = root[i]

        if (/^h[1-9]$/i.test(child.localName)) {
          let level = parseInt(child.nodeName.replace(/^H/i, ''), 10)
          let text = child.textContent
          let id = guid()

          let node = {
            id: id,
            level: level,
            element: child,
            title: text
          }

          headers.push(node)
        }

        if (child.children.length > 0) {
          this.getHeaders(child.children, headers)
        }
      }

      return headers
    }
  },
  computed: {
    _showToc () {
      return this.tocHeaders.length > 0
    },
    _biographyLink () {
      return '/biography/' + this.id
    }
  },
  components: {
    Toc,
    Clamp
  }
}
</script>

<style scoped>
</style>
