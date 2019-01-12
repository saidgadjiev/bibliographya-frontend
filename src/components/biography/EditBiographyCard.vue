<template>
  <biography-card
    :in-biography="biography"
    v-if="preview"
    show-actions
  >
    <template slot="actions">
      <v-btn @click="preview = false" flat color="orange">Продолжить редактирование</v-btn>
      <v-btn @click="doSave" flat color="orange">Сохранить</v-btn>
    </template>
    <template slot="alert">
      <alert-slot></alert-slot>
    </template>
  </biography-card>
  <v-card v-else>
    <alert-slot></alert-slot>
    <v-card-text>
      <v-layout row wrap>
        <edit-fio
          :first-name.sync="biography.firstName"
          :last-name.sync="biography.lastName"
          :middle-name.sync="biography.middleName"
        >
        </edit-fio>
        <v-flex xs12 v-if="conflict && fioConflict">
          <strong class="subheading">Конфликт:</strong>
          <p v-html="fioConflict" class="title font-weight-light"></p>
          <strong class="subheading">Ваша версия:</strong>
          <edit-fio
            :readonly="true"
            :first-name="myBiographyVersion.firstName"
            :last-name="myBiographyVersion.lastName"
            :middle-name="myBiographyVersion.middleName"
          >
          </edit-fio>
        </v-flex>
        <v-flex xs12>
          <markdown-editor
            label="Биография"
            v-bind:text.sync="biography.biography"
          ></markdown-editor>
        </v-flex>
        <v-flex xs12 v-if="conflict && biographyConflict">
          <strong class="subheading">Конфликт:</strong>
          <p v-html="biographyConflict" class="title font-weight-light" style="height: 250px; overflow-y: scroll"></p>
          <strong class="subheading">Ваша версия:</strong>
          <edit-biography
            :readonly="true"
            :biography="myBiographyVersion.biography"
          ></edit-biography>
        </v-flex>
        <v-flex xs12>
          <v-select
            :loading="loading"
            :items="categories"
            v-model="biography.categories"
            :menu-props="{ maxHeight: '400' }"
            label="Категории"
            chips
            multiple
          ></v-select>
        </v-flex>
        <v-flex xs12 v-if="conflict && categoriesConflict">
          <strong class="subheading">Конфликт:</strong>
          <p v-html="categoriesConflict" class="title font-weight-light" style="height: 250px; overflow-y: scroll"></p>
          <strong class="subheading">Ваша версия:</strong>
          <v-select
            v-model="myBiographyVersion.categories"
            label="Категории"
            chips
          ></v-select>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="preview = true" flat color="orange">Предпросмотр</v-btn>
      <v-btn @click="doSave" flat color="orange">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import EditFio from './EditFioForm'
import EditBiography from './EditBiographyForm'
import BiographyCard from './BiographyCard'
import AlertSlot from '../alert/AlertMessage'
import biographyService from '../../services/biography-service'
import biographyCategoryService from '../../services/biography-category-service'
import MarkdownEditor from '../markdown/MarkdownEditor'

const diff = require('diff')
const he = require('he')

export default {
  name: 'EditBiographyCard',
  data () {
    return {
      loading: false,
      categories: [],
      preview: false,
      options: {
        duration: 300,
        offset: -61,
        easing: 'easeInOutCubic'
      },
      fioConflict: '',
      biographyConflict: '',
      categoriesConflict: '',
      biography: {
        firstName: '',
        lastName: '',
        middleName: '',
        biography: '',
        categories: []
      },
      myBiographyVersion: {
        firstName: '',
        lastName: '',
        middleName: '',
        biography: '',
        categories: []
      },
      conflict: false
    }
  },
  props: {
    appendUserId: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'edit'
    },
    inBiography: Object,
    default: {}
  },
  created () {
    let that = this

    biographyCategoryService.getCategories(2147483647, 0)
      .then(
        response => {
          for (let i = 0; i < response.data.content.length; i++) {
            that.categories.push(response.data.content[i].name)
          }
          that.loading = false
        },
        e => {
          that.loading = false
          console.log(e)
        }
      )
  },
  mounted () {
    Object.assign(this.biography, this.inBiography)
  },
  methods: {
    fioDiff () {
      let d = diff.diffChars(this.myBiographyVersion.lastName, this.biography.lastName)

      d.push({value: ' '})
      d.push(...diff.diffChars(this.myBiographyVersion.firstName, this.biography.firstName))
      d.push({value: ' '})
      d.push(...diff.diffChars(this.myBiographyVersion.middleName, this.biography.middleName))

      return this.cleanUp(d)
    },
    biographyDiff () {
      let b1 = he.escape(this.myBiographyVersion.biography).replace(/\n/g, '<br>')
      let b2 = he.escape(this.biography.biography).replace(/\n/g, '<br>')

      return this.cleanUp(diff.diffWords(b1, b2))
    },
    categoriesDiff () {
      return this.cleanUp(diff.diffArrays(this.myBiographyVersion.categories, this.biography.categories))
    },
    cleanUp (d) {
      let diffCounts = 0
      let diffText = ''

      d.forEach(function (part) {
        if (part.added) {
          ++diffCounts
          diffText += '<ins class=\'green lighten-3\'>' + part.value + '</ins>'
        } else if (part.removed) {
          ++diffCounts
          diffText += '<del class=\'red lighten-3\'>' + part.value + '</del>'
        } else {
          diffText += part.value
        }
      })

      if (diffCounts === 0) {
        return undefined
      }
      return diffText
    },
    updateParent () {
      this.$emit('update:firstName', this.biography.firstName)
      this.$emit('update:lastName', this.biography.lastName)
      this.$emit('update:middleName', this.biography.middleName)
      this.$emit('update:biography', this.biography.biography)
      this.$emit('update:lastModified', this.biography.lastModified)
      this.$emit('update:categories', this.biography.categories)
    },
    doSave () {
      let that = this
      this.preview = false

      if (this.mode === 'edit') {
        let categoriesDiff = diff.diffArrays(this.biography.categories, this.inBiography.categories)
        let added = []
        let deleted = []

        categoriesDiff.forEach(function (element) {
          if (element.added) {
            deleted.push(...element.value)
          } else if (element.removed) {
            added.push(...element.value)
          }
        })

        biographyService.update({
          id: this.biography.id,
          firstName: this.biography.firstName,
          lastName: this.biography.lastName,
          middleName: this.biography.middleName,
          biography: this.biography.biography,
          addedCategories: added,
          deleteCategories: deleted,
          lastModified: this.biography.lastModified,
          userId: this.appendUserId ? this.getUser.id : null
        })
          .then(
            response => {
              that.biography.lastModified = response.data.lastModified
              that.updateParent()
              that.alert = true
              that.conflict = false
              that.myBiographyVersion = {}

              that.$store.dispatch('alert/success', 'Изменения сохранены.')
              that.$nextTick(function () {
                that.$vuetify.goTo('#alert-success', that.options)
              })
            },
            e => {
              if (e.response.status === 409) {
                Object.assign(that.myBiographyVersion, that.biography)

                that.biography = e.response.data
                that.conflict = true
                that.fioConflict = that.fioDiff()
                that.biographyConflict = that.biographyDiff()
                that.categoriesConflict = that.categoriesDiff()

                that.$store.dispatch('alert/error', 'Произошел конфликт. Пожалуйста перенесите свои изменения в соответствии с текущей версией')
                that.$nextTick(function () {
                  that.$vuetify.goTo('#alert-error', that.options)
                })
              } else {
                console.log(e)
              }
            }
          )
      } else if (this.mode === 'create') {
        biographyService.create({
          firstName: this.biography.firstName,
          lastName: this.biography.lastName,
          middleName: this.biography.middleName,
          biography: this.biography.biography,
          addedCategories: this.biography.categories,
          userId: this.appendUserId ? this.getUser.id : null
        })
          .then(
            response => {
              that.biography = response.data
              that.updateParent()

              Object.assign(that.biography, that.inBiography)
              that.$store.dispatch('alert/success', 'Биография создана. Вы можете увидеть ее в разделе Созданные мной.')
              that.$nextTick(function () {
                that.$vuetify.goTo('#alert-success', that.options)
              })
            },
            e => {
              console.log(e)
            }
          )
      }
    }
  },
  components: {
    MarkdownEditor,
    EditFio,
    EditBiography,
    BiographyCard,
    AlertSlot
  }
}
</script>

<style scoped>

</style>
