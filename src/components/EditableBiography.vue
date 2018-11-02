<template>
  <v-card>
    <v-card-text class="grey lighten-3">
      <tree-view :items="items"></tree-view>
      <p v-html="sanitizedBiography"></p>
    </v-card-text>
    <edit-biography :biography-id="biographyId"></edit-biography>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import sanitize from '../services/sanitize-service'
import TreeView from './TreeView.vue'
import EditBiography from './EditBiography.vue'

const htmlparser = require('htmlparser2')

export default {
  name: 'EditableBiography',
  props: {
    biographyId: Number
  },
  computed: {
    ...mapGetters([
      'getBiographyById'
    ]),
    biography () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.biography : ''
    },
    sanitizedBiography () {
      return sanitize.sanitize(this.biography)
    },
    items () {
      let html = this.biography
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
    TreeView,
    EditBiography
  }
}
</script>

<style scoped>

</style>
