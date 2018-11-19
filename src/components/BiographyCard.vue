<template>
  <v-card>
    <v-card-title>
        <span :class="fioClass">
          {{lastName + ' ' + firstName + ' ' + middleName}}
        </span>
      <v-spacer></v-spacer>
      <v-menu bottom left>
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
      <span :class="biographyTitleClass">Биография:</span>
      <tree-view :class="biographyTreeClass" v-if="items.length > 0" :items="items"></tree-view>
      <slot name="treeClamp"></slot>
      <p class="m-0" :class="biographyClass" v-html="sanitizedBiography"></p>
      <slot name="biographyClamp"></slot>
    </v-card-text>
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
    <div v-if="showComments">
      <v-divider class="m-0"></v-divider>
      <comments id="comments" :biography-id="biography.id"></comments>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeView from './TreeView.vue'
import sanitize from '../services/sanitize-service'
import Like from '../components/Like.vue'
import Comments from '../components/Comments'

const htmlparser = require('htmlparser2')
const htmlTruncate = require('html-truncate')

export default {
  name: 'biography-card',
  props: {
    biography: {
      required: true,
      type: Object
    },
    fioClass: {
      default: 'headline',
      type: String
    },
    biographyTitleClass: {
      default: 'subheading',
      type: String
    },
    biographyTreeClass: String,
    biographyClass: {
      default: 'subheading',
      type: String
    },
    showComments: {
      default: false,
      type: Boolean
    },
    truncate: Number,
    treeSize: Number
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'getUsername'
    ]),
    firstName () {
      return this.biography ? this.biography.firstName : ''
    },
    lastName () {
      return this.biography ? this.biography.lastName : ''
    },
    middleName () {
      return this.biography ? this.biography.middleName : ''
    },
    biographyText () {
      return this.biography.biography
    },
    sanitizedBiography () {
      let biography = this.biographyText

      if (this.truncate) {
        biography = htmlTruncate(biography, this.truncate)
      }

      return sanitize.sanitize(biography)
    },
    items () {
      let html = this.biographyText
      let tree = []

      if (html) {
        let treeSize = this.treeSize
        let currentNode = {}
        let rootIndex = -1
        let size = 0

        let parser = new htmlparser.Parser({
          onopentag: function (tagname, attribs) {
            if (tagname === 'l') {
              ++size
              currentNode.id = '#' + attribs.id
              ++rootIndex
            } else if (tagname === 'll') {
              ++size
              currentNode.id = '#' + attribs.id
            }
            console.log(tagname)
            console.log(attribs)
          },
          ontext: function (text) {
            currentNode.name = text
            console.log(text)
          },
          onclosetag: function (tagname) {
            if (tagname === 'l') {
              if (treeSize) {
                if (size - 1 < treeSize) {
                  tree.push(currentNode)
                }
              } else {
                tree.push(currentNode)
              }
            } else if (tagname === 'll') {
              if (treeSize) {
                if (size - 1 < treeSize) {
                  if (!tree[rootIndex].children) {
                    tree[rootIndex].children = []
                  }
                  tree[rootIndex].children.push(currentNode)
                }
              } else {
                if (!tree[rootIndex].children) {
                  tree[rootIndex].children = []
                }
                tree[rootIndex].children.push(currentNode)
              }
            }
            currentNode = {}
            console.log(tagname)
          }
        }, { decodeEntities: true })

        parser.write(html)
      }

      return tree
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

</style>
