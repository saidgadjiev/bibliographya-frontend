<template>
  <v-card tile>
    <v-card-text>
      <v-form>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="biographyForm.lastName"
              :error-messages="errors.collect('lastName')"
              v-validate="'required'"
              name="lastName"
              label="Фамилия"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="biographyForm.firstName"
              :error-messages="errors.collect('firstName')"
              v-validate="'required'"
              name="firstName"
              label="Имя"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="biographyForm.middleName"
              label="Отчество"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-if="conflict && fioConflict">
            <strong class="subheading">Конфликт:</strong>
            <p v-html="fioConflict" class="title font-weight-light"></p>
            <strong class="subheading">Ваша версия:</strong>
            <v-layout row wrap>
              <v-flex xs12 sm6 md3 class="pl-0">
                <v-text-field
                  v-model="myBiographyVersion.lastName"
                  readonly
                  label="Фамилия"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  v-model="myBiographyVersion.firstName"
                  readonly
                  label="Имя"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  v-model="myBiographyVersion.middleName"
                  readonly
                  label="Отчество"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <span>Биография:</span>
            <tiny-editor
              id="biography_editor"
              :value.sync="biographyForm.biography"
            ></tiny-editor>
          </v-flex>
          <v-flex xs12 v-if="conflict && biographyConflict">
            <strong class="subheading">Конфликт:</strong>
            <p v-html="biographyConflict" class="title font-weight-light" style="height: 250px; overflow-y: scroll"></p>
            <strong class="subheading">Ваша версия:</strong>
            <tiny-editor
              id="biography_conflict_editor"
              readonly
              :value="myBiographyVersion.biography"
            ></tiny-editor>
          </v-flex>
          <v-flex xs12>
            <v-select
              :loading="categoriesLoading"
              :items="categories"
              v-model="biographyForm.categories"
              :menu-props="{ maxHeight: '400' }"
              item-text="name"
              item-value="id"
              label="Категории"
              chips
              multiple
            ></v-select>
          </v-flex>
          <v-flex xs12 v-if="conflict && categoriesConflict">
            <strong class="subheading">Конфликт:</strong>
            <p v-html="categoriesConflict" class="title font-weight-light"
               style="height: 250px; overflow-y: scroll"></p>
            <strong class="subheading">Ваша версия:</strong>
            <v-select
              v-model="myBiographyVersion.categories"
              item-text="name"
              item-value="id"
              readonly
              label="Категории"
              chips
            ></v-select>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn @click="doSave" :loading="saveLoading" :disabled="saveLoading" color="primary">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import biographyService from '../../../services/biography-service'
import biographyCategoryService from '../../../services/biography-category-service'
import TinyEditor from '../../tinymce/TinyEditor'
import alert from '../../../mixins/alert'

const diff = require('diff')
const he = require('he')

export default {
  name: 'EditBiographyCard',
  mixins: [alert],
  data () {
    return {
      saveLoading: false,
      categoriesLoading: false,
      categories: [],
      fioConflict: '',
      biographyConflict: '',
      categoriesConflict: '',
      biographyForm: {
        firstName: '',
        lastName: '',
        middleName: '',
        biography: '',
        updatedAt: undefined,
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
            that.categories.push(response.data.content[i])
          }
          that.categoriesLoading = false
        },
        e => {
          that.categoriesLoading = false
          console.log(e)
        }
      )
    this.$validator.localize('ru', {
      custom: {
        firstName: {
          required: () => 'Введите имя'
        },
        lastName: {
          required: () => 'Введите фамилию'
        }
      }
    })
  },
  mounted () {
    if (this.mode === 'edit') {
      Object.assign(this.biographyForm, this.inBiography)
    }
  },
  methods: {
    fioDiff () {
      let d = diff.diffChars(this.myBiographyVersion.lastName, this.biographyForm.lastName)

      d.push({ value: ' ' })
      d.push(...diff.diffChars(this.myBiographyVersion.firstName, this.biographyForm.firstName))
      d.push({ value: ' ' })
      d.push(...diff.diffChars(this.myBiographyVersion.middleName, this.biographyForm.middleName))

      return this.cleanUp(d)
    },
    biographyDiff () {
      let b1 = he.escape(this.myBiographyVersion.biography || '').replace(/\n/g, '<br>')
      let b2 = he.escape(this.biographyForm.biography || '').replace(/\n/g, '<br>')

      return this.cleanUp(diff.diffWords(b1, b2))
    },
    categoriesDiff () {
      return this.cleanUp(diff.diffArrays(this.myBiographyVersion.categories, this.biographyForm.categories))
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
    clearBiographyForm () {
      Object.assign(this.biographyForm, {
        firstName: '',
        lastName: '',
        middleName: '',
        biography: '',
        updatedAt: undefined,
        categories: []
      })
    },
    updateParent (data) {
      this.$emit('update:firstName', data.firstName)
      this.$emit('update:lastName', data.lastName)
      this.$emit('update:middleName', data.middleName)
      this.$emit('update:biography', data.biography)
      this.$emit('update:updatedAt', data.updatedAt)
      this.$emit('update:categories', data.categories)
    },
    doSave () {
      let that = this
      this.$validator.validateAll().then(result => {
        if (result) {
          that.saveLoading = true

          if (that.mode === 'edit') {
            let categoriesDiff = diff.diffArrays(that.biographyForm.categories, that.inBiography.categories, {
              comparator: function (left, right) {
                return left.id === right.id
              }
            })
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
              id: that.biographyForm.id,
              firstName: that.biographyForm.firstName,
              lastName: that.biographyForm.lastName,
              middleName: that.biographyForm.middleName,
              biography: that.biographyForm.biography,
              addCategories: added,
              deleteCategories: deleted,
              updatedAt: that.biographyForm.updatedAt
            })
              .then(
                response => {
                  that.biographyForm.updatedAt = response.data.updatedAt
                  that.updateParent(that.biographyForm)

                  that.setAlertSuccess('Изменения сохранены.')

                  that.conflict = false
                  that.myBiographyVersion = {}
                },
                e => {
                  if (e.response.status === 409) {
                    that.$swal.fire({
                      text: 'Произошел конфликт. Пожалуйста перенесите свои изменения в соответствии с текущей версией',
                      type: 'error',
                      showCloseButton: true
                    })
                    Object.assign(that.myBiographyVersion, that.biographyForm)

                    Object.assign(that.biographyForm, e.response.data)
                    that.conflict = true
                    that.fioConflict = that.fioDiff()
                    that.biographyConflict = that.biographyDiff()
                    that.categoriesConflict = that.categoriesDiff()
                  }
                }
              )
              .finally(() => {
                that.saveLoading = false
              })
          } else if (that.mode === 'create') {
            biographyService.create({
              firstName: that.biographyForm.firstName,
              lastName: that.biographyForm.lastName,
              middleName: that.biographyForm.middleName,
              biography: that.biographyForm.biography,
              addedCategories: that.biographyForm.categories.map(e => e.id)
            })
              .then(
                () => {
                  that.clearBiographyForm()
                  that.setAlertSuccess('Биография создана. Вы можете увидеть ее в разделе Созданные мной.')
                  that.saveLoading = false
                  that.$validator.reset()
                },
                e => {
                  that.saveLoading = false
                }
              )
          }
        }
      })
    }
  },
  components: {
    TinyEditor
  }
}
</script>

<style scoped>
  .preview {
    height: 300px;
    overflow: scroll;
    font-size: 20px;
  }

  .preview-header {
    color: #1B5E20;
  }
</style>
