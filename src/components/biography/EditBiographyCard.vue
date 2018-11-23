<template>
  <biography-card
    :biography="biography"
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
          <edit-biography
            v-bind:biography.sync="biography.biography"
          >
          </edit-biography>
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
import AlertSlot from './AlertSlot'

const diff = require('diff')
const he = require('he')

export default {
  name: 'EditBiographyCard',
  data () {
    return {
      preview: false,
      options: {
        duration: 300,
        offset: -61,
        easing: 'easeInOutCubic'
      },
      fioConflict: '',
      biographyConflict: '',
      biography: {
        firstName: '',
        lastName: '',
        middleName: '',
        biography: ''
      },
      myBiographyVersion: {
        firstName: '',
        lastName: '',
        middleName: '',
        biography: ''
      },
      conflict: false
    }
  },
  props: {
    inBiography: Object
  },
  mounted () {
    Object.assign(this.biography, this.inBiography)
  },
  methods: {
    isEquivalent (a, b) {
      // Create arrays of property names
      var aProps = Object.getOwnPropertyNames(a)
      var bProps = Object.getOwnPropertyNames(b)

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length !== bProps.length) {
        return false
      }

      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i]

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
          return false
        }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true
    },
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
    doSave () {
      let that = this
      this.preview = false

      this.$store.dispatch('updateBiography', this.biography)
        .then(
          response => {
            that.biography.lastModified = response.data.lastModified
            that.alert = true
            that.conflict = false
            that.myBiographyVersion = {}

            that.$store.dispatch('alert/success', 'Изменения сохранены. Новые данные будут отражены на Вашей странице.')
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

              that.$store.dispatch('alert/error', 'Произошел конфликт. Пожалуйста перенесите свои изменения в соответствии с текущей версией')
              that.$nextTick(function () {
                that.$vuetify.goTo('#alert-error', that.options)
              })
            } else {
              console.log(e)
            }
          }
        )
    }
  },
  components: {
    EditFio,
    EditBiography,
    BiographyCard,
    AlertSlot
  }
}
</script>

<style scoped>

</style>
