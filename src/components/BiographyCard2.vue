<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row>
        <span :class="fioClass">
          {{lastName + ' ' + firstName + ' ' + middleName}}
        </span>
        <v-spacer></v-spacer>
        <v-btn v-if="showEdit" icon @click="$router.push('/edit/biography/' + biography.id)">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-layout>
    </v-card-title>
    <v-divider class="m-0"></v-divider>
    <v-card-text>
      <span :class="biographyTitleClass">Биография:</span>
      <tree-view :class="biographyTreeClass" v-if="items.length > 0" :items="items"></tree-view>
      <slot name="treeClamp"></slot>
      <p class="m-0" :class="biographyClass" v-html="sanitizedBiography"></p>
      <slot name="biographyClamp"></slot>
    </v-card-text>
    <slot name="actions"></slot>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeView from './TreeView.vue'
import sanitize from '../services/sanitize-service'

const htmlparser = require('htmlparser2')
const htmlTruncate = require('html-truncate')

export default {
  name: 'biography-card',
  props: {
    biography: {
      default: () => {},
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
    truncate: Number,
    treeSize: Number
  },
  computed: {
    ...mapGetters([
      'isAuthorized',
      'getUsername'
    ]),
    showEdit () {
      let username = this.getUsername

      if (username === this.biography.creatorName) {
        return true
      }

      return this.isAuthorized(['ROLE_ADMIN'])
    },
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
  components: {
    TreeView
  }
}
</script>

<style scoped>

</style>
