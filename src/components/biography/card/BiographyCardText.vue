<template>
  <v-card-text>
    <toc
      v-if="_showToc"
      :headers="tocHeaders"
      v-bind="_attrs"
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
import Clamp from './HtmlClamp'
import Toc from './Toc'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import { BIOGRAPHY_CARD_MODE } from '../../../config'

let htmlparser = require('htmlparser2')

export default {
  name: 'BiographyCardText',
  inheritAttrs: false,
  data () {
    return {
      tocHeaders: []
    }
  },
  props: {
    mode: {
      type: String,
      default: BIOGRAPHY_CARD_MODE.LIST
    },
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

      if (this.mode === BIOGRAPHY_CARD_MODE.READ) {
        this.getHeadersForRead(children, headers, this.guid(''))
      } else {
        this.getHeadersForList(this.biography, headers, this.guid(''))
      }

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
    getHeadersForList (source, headers, guid) {
      let currentNode = {}

      let parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
          if (/^h[1-9]$/i.test(name)) {
            currentNode.level = parseInt(name.replace(/^H/i, ''), 10)
          }
        },
        ontext: function (text) {
          if (currentNode.level) {
            currentNode.title = text
          }
        },
        onclosetag: function (tagname) {
          if (/^h[1-9]$/i.test(tagname)) {
            currentNode.id = cyrillicToTranslit().transform(currentNode.title, '_') + '_' + guid()

            headers.push(currentNode)
            currentNode = {}
          }
        }
      }, { decodeEntities: true })
      parser.write(source)
      parser.end()

      return headers
    },
    getHeadersForRead (root, headers, guid) {
      for (let i = 0; i < root.length; ++i) {
        let child = root[i]

        if (/^h[1-9]$/i.test(child.localName)) {
          let level = parseInt(child.nodeName.replace(/^H/i, ''), 10)
          let text = child.textContent
          let id = cyrillicToTranslit().transform(text, '_') + '_' + guid()

          let node = {
            id: id,
            level: level,
            element: child,
            title: text
          }

          headers.push(node)
        }

        if (child.children.length > 0) {
          this.getHeadersForRead(child.children, headers)
        }
      }

      return headers
    }
  },
  computed: {
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          id: this.id,
          mode: this.mode
        }
      )
    },
    _showToc () {
      return this.tocHeaders.length > 0
    },
    _biographyLink () {
      return '/biographies/' + this.id
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
