<template>
  <v-card :flat="flat">
    <slot name="alert"></slot>
    <div v-if="showStatus">
      <v-card-title>
        <strong>{{ moderationStatus }}</strong>
      </v-card-title>
      <v-divider class="m-0"></v-divider>
    </div>
    <v-card-title>
        <span :class="fioClasses">
          {{biography.lastName + ' ' + biography.firstName + ' ' + biography.middleName}}
        </span>
      <v-spacer></v-spacer>
      <v-menu bottom left v-if="showMenu">
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>fas fa-caret-down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            @click="$router.push('/edit/biography/' + biography.id)"
          >
            <v-list-tile-title>Редактировать</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Пожаловаться</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Предложить исправление</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider class="m-0"></v-divider>
    <v-card-text>
      <span :class="biographyTitleClasses">Биография:</span>
      <tree-view :class="biographyTreeClasses" v-if="items" :items="items"></tree-view>
      <template v-if="treeClamp">
        <div v-if="treeClamped">
          <span class="d-block">...</span>
          <a href="#" @click="treeClamped = false">Показать содержание</a>
        </div>
        <div v-else>
          <a href="#" @click="treeClamped = true">Скрыть содержание</a>
        </div>
      </template>
      <p class="m-0" :class="biographyClasses" v-html="sanitizedBiography"></p>
      <template v-if="biographyClamp">
        <a :href="'#/biography/' + biography.id">Читать дальше</a>
      </template>
    </v-card-text>
    <slot v-if="showActions" name="actions">
      <v-divider class="m-0"></v-divider>
      <v-card-actions>
      <like
        @like-toggled="onLikeToggled"
        :biography="biography" class="ml-1"></like>
      <a :href="'#/biography/' + biography.id + '#comments'" class="ml-2" style="text-decoration: none">
        <v-icon color="blue darken-1">mdi-comment-outline</v-icon>
        <span style="font-size: 18px">{{ biography.commentsCount }}</span>
      </a>
      <v-spacer></v-spacer>
      <v-icon color="blue darken-1" style="font-size:14px">fas fa-eye</v-icon>
      <span class="ml-1">0</span>
    </v-card-actions>
    </slot>
    <template v-if="showComments">
      <v-divider class="m-0"></v-divider>
      <comments
        id="comments"
        :biography-id="biography.id"
        @comment-deleted="biography.commentsCount -= 1"
        @comment-added="biography.commentsCount += 1"
      ></comments>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeView from '../tree/TreeView.vue'
import sanitize from '../../services/sanitize-service'
import Like from '../Like.vue'
import Comments from '../comment/Comments'

const htmlParser = require('htmlparser2')
const htmlTruncate = require('html-truncate')

export default {
  name: 'biography-card',
  data () {
    return {
      treeClamped: true
    }
  },
  props: {
    biography: {
      required: true,
      type: Object
    },
    type: {
      type: String,
      default: 'default'
    },
    showComments: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: false
    },
    showMenu: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: false
    },
    treeClamp: {
      type: Boolean,
      default: false
    },
    biographyClamp: {
      type: Boolean,
      default: false
    },
    biographyClampSize: Number,
    treeClampSize: Number,
    flat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'getUsername'
    ]),
    moderationStatus () {
      let status = this.biography.moderationStatus

      if (status !== undefined) {
        switch (status) {
          case 0:
            return 'На модерации'
          case 1:
            return 'Одобрено'
          case 2:
            return 'Отклонено'
        }
      }

      return ''
    },
    fioClasses () {
      return this.type === 'small' ? 'body-2' : 'headline'
    },
    biographyTitleClasses () {
      return this.type === 'small' ? 'body-1' : 'subheading'
    },
    biographyTreeClasses () {
      return ''
    },
    biographyClasses () {
      return this.type === 'small' ? 'caption' : 'subheading'
    },
    sanitizedBiography () {
      let biography = this.biography.biography

      if (this.biographyClamp) {
        biography = htmlTruncate(biography, this.biographyClampSize, {})
      }

      return sanitize.sanitizeWithAllowedTags(biography)
    },
    items () {
      let html = this.biography.biography

      if (html) {
        let tree = []
        let that = this
        let currentNode = {}
        let rootIndex = -1
        let size = 0

        let parser = new htmlParser.Parser({
          onopentag: function (tagName, attributes) {
            if (tagName === 'l') {
              ++size
              currentNode.id = '#' + attributes.id
              ++rootIndex
            } else if (tagName === 'll') {
              ++size
              currentNode.id = '#' + attributes.id
            }
          },
          ontext: function (text) {
            currentNode.name = text
          },
          onclosetag: function (tagName) {
            if (tagName === 'l') {
              if (that.treeClamp && that.treeClamped) {
                if (size - 1 < that.treeClampSize) {
                  tree.push(currentNode)
                }
              } else {
                tree.push(currentNode)
              }
            } else if (tagName === 'll') {
              if (!tree[rootIndex].children) {
                tree[rootIndex].children = []
              }
              if (that.treeClamp && that.treeClamped) {
                if (size - 1 < that.treeClampSize) {
                  tree[rootIndex].children.push(currentNode)
                }
              } else {
                tree[rootIndex].children.push(currentNode)
              }
            }
            currentNode = {}
          }
        }, { decodeEntities: true })

        parser.write(html)

        return tree
      }

      return undefined
    }
  },
  methods: {
    onLikeToggled () {
      this.biography.likesCount += (this.biography.liked ? -1 : 1)
      this.biography.liked = !this.biography.liked
    }
  },
  mounted () {
    if (this.$route.hash) {
      this.$vuetify.goTo(this.$route.hash, {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    }
  },
  components: {
    TreeView,
    Like,
    Comments
  }
}
</script>

<style scoped>
  @import "../../../static/bibliography.css";
</style>
