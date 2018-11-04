<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <span :class="fioClass">
          {{lastName + ' ' + firstName + ' ' + middleName}}
        </span>
      </div>
    </v-card-title>
    <v-divider class="m-0"></v-divider>
    <v-card-text>
      <span :class="biographyTitleClass">Биография:</span>
      <tree-view :class="biographyTreeClass" v-if="items.length > 0" :items="items"></tree-view>
      <p class="m-0" :class="biographyClass" v-html="sanitizedBiography"></p>
      <slot name="biographyClamp"></slot>
    </v-card-text>
    <slot name="actions"></slot>
  </v-card>
</template>

<script>
import TreeView from './TreeView.vue'
import sanitize from '../services/sanitize-service'

const htmlparser = require('htmlparser2')

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
    }
  },
  computed: {
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
      return sanitize.sanitize(this.biographyText)
    },
    items () {
      let html = this.biographyText
      let tree = []

      if (html) {
        let currentNode = {}
        let rootIndex = -1

        let parser = new htmlparser.Parser({
          onopentag: function (tagname, attribs) {
            if (tagname === 'l') {
              currentNode.id = '#' + attribs.id
              ++rootIndex
            } else if (tagname === 'll') {
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
              tree.push(currentNode)
            } else if (tagname === 'll') {
              if (!tree[rootIndex].children) {
                tree[rootIndex].children = []
              }
              tree[rootIndex].children.push(currentNode)
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
