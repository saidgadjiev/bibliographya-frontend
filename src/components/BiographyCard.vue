<template>
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
          <v-layout v-if="isEditFio" row wrap>
            <v-flex xs12 sm6 md3>
              <v-text-field
                v-model="editLastName"
                label="Фамилия"
                type="text"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field
                v-model="editFirstName"
                label="Имя"
                type="text"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
              <v-text-field
                v-model="editMiddleName"
                label="Отчество"
                type="text"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="grey lighten-3">
          <div v-if="isEditFio">
            <v-btn @click="doSaveFio" flat color="orange">Сохранить</v-btn>
            <v-btn @click="isEditFio = false" flat color="orange">Отменить</v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon @click="doEditFio">
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
          <v-layout v-if="isEditBiography" row wrap>
            <v-flex xs12>
              <v-textarea
                auto-grow
                class="w-100"
                v-model="editBiography"
                label="Биография"
                type="text"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="grey lighten-3">
          <div v-if="isEditBiography">
            <v-btn @click="doSaveBiography" flat color="orange">Сохранить</v-btn>
            <v-btn @click="isEditBiography = !isEditBiography" flat color="orange">Отменить</v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon @click="doEditBiography">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeView from './TreeView.vue'

const htmlparser = require('htmlparser2')
const DOMPurify = require('dompurify')

export default {
  name: 'biography-card',
  data () {
    return {
      defaultExpand: [true],
      isEditFio: false,
      isEditBiography: false,
      editFirstName: '',
      editLastName: '',
      editMiddleName: '',
      editBiography: ''
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
      return DOMPurify.sanitize(this.biography, { ALLOWED_TAGS: ['h1', 'l'] })
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
    doEditFio () {
      this.isEditFio = !this.isEditFio
      this.editFirstName = this.firstName
      this.editLastName = this.lastName
      this.editMiddleName = this.middleName
    },
    doSaveFio () {
      let that = this

      if (this.editFirstName === this.firstName &&
          this.editLastName === this.lastName &&
          this.editMiddleName === this.middleName
      ) {
        that.isEditFio = false

        return
      }
      this.$store.dispatch('updateFio', {
        firstName: this.editFirstName,
        lastName: this.editLastName,
        middleName: this.editMiddleName
      }).then(
        () => {
          that.isEditFio = false
          that.editFirstName = ''
          that.editLastName = ''
          that.editMiddleName = ''
        }
      )
    },
    doEditBiography () {
      this.isEditBiography = !this.isEditBiography
      this.editBiography = this.biography
    },
    doSaveBiography () {
      let that = this

      if (this.editBiography === this.biography) {
        that.isEditBiography = false

        return
      }

      this.$store.dispatch('updateBiography', {
        biography: this.editBiography
      }).then(
        () => {
          that.isEditBiography = false
          that.eeditBiography = ''
        }
      )
    }
  },
  components: {
    TreeView
  }
}
</script>

<style scoped>

</style>
