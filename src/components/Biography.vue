<template>
  <v-layout row fill-height="true">
    <v-flex xs4>
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">Jonathan Lee</div>
            <div class="body-1">heyfromjonathan@gmail.com</div>
          </v-flex>
        </v-layout>
      </v-img>
    </v-flex>
    <v-flex xs8>
      <v-expansion-panel
        v-model="defaultExpand"
        expand
      >
        <v-expansion-panel-content
          readonly
          expand-icon="fas fa-chevron-down"
        >
          <div slot="header">Фамилия Имя Отчество</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <strong>{{lastName + ' ' + firstName + ' ' + middleName}}</strong>
              <v-layout v-if="editFio" row wrap>
                <v-flex xs12 sm6 md3>
                  <v-text-field
                    v-model="lastName"
                    label="Фамилия"
                    type="text"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field
                    v-model="firstName"
                    label="Имя"
                    type="text"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field
                    v-model="middleName"
                    label="Отчество"
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="grey lighten-3">
              <div v-if="editFio">
                <v-btn @click="saveFio" flat color="orange">Сохранить</v-btn>
                <v-btn @click="editFio = !editFio" flat color="orange">Отменить</v-btn>
              </div>
              <v-spacer></v-spacer>
              <v-btn icon @click="editFio = !editFio">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          expand-icon="fas fa-chevron-down"
        >
          <div slot="header">Биография</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              <tree-view :items="items"></tree-view>
              <p v-html="sanitizedBiography"></p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeView from './TreeView.vue'

const htmlparser = require('htmlparser2')
const DOMpurify = require('dompurify)

export default {
  name: 'biography',
  data () {
    return {
      defaultExpand: [true],
      editFio: false
    }
  },
  computed: {
    ...mapGetters([
      'firstName',
      'lastName',
      'middleName',
      'biography'
    ]),
    sanitizedBiography () {
      let clean = DOMPurify.sanitize(this.biography)

      return ''
    },
    items () {
      let html = this.biography
      let tree = []
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

      return tree
    }
  },
  methods: {
    saveFio () {
    }
  },
  components: {
    TreeView
  }
}
</script>

<style scoped>

</style>
