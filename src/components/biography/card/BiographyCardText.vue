<template>
  <v-card-text>
    <toc
      v-if="_showToc"
      :headers="tocHeaders"
      v-bind="_attrs"
    ></toc>
    <clamp
      v-if="bio"
      ref="biography"
      :source="bio"
      :clamp="biographyClamp"
      :clamp-link="_biographyLink"
      clamp-link-label="Читать дальше..."
    ></clamp>
    <small class="font-weight-bold">
      <a class="bib-a" style="color: #37474F !important;" @click="showLikes">Понравилось {{ likesCount }} людям</a>
    </small>
    <likes v-bind="_attrs" v-on="$listeners" :visible.sync="likesDialogVisible"/>
  </v-card-text>
</template>

<script>
import Clamp from './HtmlClamp'
import Toc from './Toc'
import { BIOGRAPHY_CARD_MODE } from '../../../config'
import Likes from '../../like/Likes'

export default {
  name: 'BiographyCardText',
  inheritAttrs: false,
  data () {
    return {
      tocHeaders: [],
      likesDialogVisible: false
    }
  },
  props: {
    likesCount: Number,
    mode: {
      type: String,
      default: BIOGRAPHY_CARD_MODE.LIST
    },
    headers: {
      type: Array
    },
    bio: {
      type: String,
      default: ''
    },
    biographyClamp: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  },
  mounted () {
    if (this.bio) {
      let children = this.$refs.biography.$el.children[0].children

      if (this.mode === BIOGRAPHY_CARD_MODE.READ) {
        this.getHeadersForRead(children, this.tocHeaders, this.guid())
      } else {
        this.postHeadersForList(this.headers, this.tocHeaders, this.guid())
      }
    }
  },
  methods: {
    showLikes () {
      if (this.likesCount > 0) {
        this.likesDialogVisible = true
      }
    },
    guid () {
      let counter = 0

      return function () {
        return 'head_' + counter++
      }
    },
    postHeadersForList (headers, tocHeaders, guid) {
      for (let i = 0; i < headers.length; ++i) {
        let header = headers[i]

        let currentNode = {
          id: guid(),
          title: header.text,
          level: header.level
        }

        tocHeaders.push(currentNode)
      }

      return tocHeaders
    },
    getHeadersForRead (root, headers, guid) {
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
    Likes,
    Toc,
    Clamp
  }
}
</script>

<style scoped>
</style>
