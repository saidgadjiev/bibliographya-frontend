<template>
  <v-card tile>
    <v-card-title>
      <h4>Перед тем как начать писать биографию ознакомтесь с&nbsp;<router-link to="/biography/privacy" class="bib-a subheading">правилами оформления биографий</router-link>.</h4>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-layout row wrap>
          <v-flex xs12 md4>
            <v-text-field
              v-model.trim="biographyForm.lastName"
              :error-messages="errors.collect('lastName')"
              v-validate="'required'"
              name="lastName"
              label="Фамилия"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field
              v-model.trim="biographyForm.firstName"
              :error-messages="errors.collect('firstName')"
              v-validate="'required'"
              name="firstName"
              label="Имя"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field
              v-model.trim="biographyForm.middleName"
              label="Отчество"
              type="text"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 v-if="conflict && fioConflict">
            <strong class="subheading">Конфликт:</strong>
            <p v-html="fioConflict" class="title font-weight-light"></p>
            <strong class="subheading">Ваша версия:</strong>
            <v-layout row wrap>
              <v-flex xs12 md4 class="pl-0">
                <v-text-field
                  v-model="myBiographyVersion.lastName"
                  readonly
                  label="Фамилия"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="myBiographyVersion.firstName"
                  readonly
                  label="Имя"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
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
            <v-select
              :loading="countriesLoading"
              :items="countries"
              item-text="name"
              item-value="id"
              name="countryId"
              v-model="biographyForm.countryId"
              v-validate="'required'"
              :error-messages="errors.collect('countryId')"
              :menu-props="{ maxHeight: '400', closeOnContentClick: true, offsetY: true }"
              label="Страна"
              no-data-text="Нет данных"
            >
            </v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              :loading="professionsLoading"
              :items="professions"
              v-model="biographyForm.professions"
              :menu-props="{ maxHeight: '400', closeOnContentClick: true, offsetY: true }"
              item-text="name"
              item-value="id"
              label="Род деятельности"
              chips
              multiple
              deletable-chips
              no-data-text="Нет данных"
            >
            </v-select>
          </v-flex>
          <v-flex xs12>
            <span>Биография:</span>
            <tiny-editor
              id="biography_editor"
              v-model.trim="biographyForm.bio"
              :media-url="_mediaUrl"
              :media-base-path="_mediaBasePath"
              @save="doSave"
            ></tiny-editor>
          </v-flex>
          <v-flex xs12 v-if="conflict && biographyConflict">
            <strong class="subheading">Конфликт:</strong>
            <p v-html="biographyConflict" class="title font-weight-light" style="height: 250px; overflow-y: scroll"></p>
            <strong class="subheading">Ваша версия:</strong>
            <tiny-editor
              id="biography_conflict_editor"
              readonly
              :value="myBiographyVersion.bio"
            ></tiny-editor>
          </v-flex>
          <v-flex xs12>
            <v-select
              :loading="categoriesLoading"
              :items="categories"
              v-model="biographyForm.categories"
              :menu-props="{ maxHeight: '400', closeOnContentClick: true, top: true, offsetY: true }"
              item-text="name"
              item-value="id"
              label="Категории"
              chips
              multiple
              deletable-chips
              no-data-text="Нет данных"
            >
            </v-select>
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
import biographyService from '../../../services/cache-biography-service'
import biographyCategoryService from '../../../services/cache-biography-category-service'
import TinyEditor from '../../tinymce/TinyEditor'
import alert from '../../../mixins/alert'
import fileService from '../../../services/file-service'
import professionService from '../../../services/profession-service'
import countryService from '../../../services/country-service'

const diff = require('diff')
const he = require('he')
const Url = require('url-parse')

export default {
  name: 'EditBiographyCard',
  inheritAttrs: false,
  mixins: [alert],
  data () {
    return {
      saveLoading: false,
      categoriesLoading: true,
      professionsLoading: true,
      countriesLoading: true,
      categories: [],
      professions: [],
      countries: [],
      fioConflict: '',
      biographyConflict: '',
      categoriesConflict: '',
      biographyForm: {
        firstName: '',
        lastName: '',
        middleName: '',
        bio: '',
        countryId: null,
        updatedAt: undefined,
        categories: [],
        professions: []
      },
      myBiographyVersion: {
        firstName: '',
        lastName: '',
        middleName: '',
        bio: ''
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
  computed: {
    _mediaUrl () {
      return fileService.getMediaUploadUrl()
    },
    _mediaBasePath () {
      return fileService.getMediaResourceUrl()
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        countryId: {
          required: () => 'Выберите страну'
        },
        firstName: {
          required: () => 'Введите имя'
        },
        lastName: {
          required: () => 'Введите фамилию'
        }
      }
    })
    this.loadCategories()
    this.loadCountries()
    this.loadProfessions()
  },
  mounted () {
    if (this.mode === 'edit') {
      Object.assign(this.biographyForm, this.inBiography)
    }
  },
  methods: {
    loadCategories () {
      let that = this

      biographyCategoryService.getCategories(2147483647, 0)
        .then(
          response => {
            if (response.status === that.HttpStatus.OK) {
              for (let i = 0; i < response.data.content.length; i++) {
                that.categories.push(response.data.content[i])
              }
            }
          },
          e => {}
        ).finally(() => {
          that.categoriesLoading = false
        })
    },
    loadCountries () {
      let that = this

      countryService.getCountries()
        .then(
          response => {
            if (response.status === that.HttpStatus.OK) {
              for (let i = 0; i < response.data.length; i++) {
                that.countries.push(response.data[i])
              }
            }
          },
          e => {}
        ).finally(() => {
          that.countriesLoading = false
        })
    },
    loadProfessions () {
      let that = this

      professionService.getProfessions()
        .then(
          response => {
            if (response.status === that.HttpStatus.OK) {
              for (let i = 0; i < response.data.length; i++) {
                that.professions.push(response.data[i])
              }
            }
          },
          e => {}
        ).finally(() => {
          that.professionsLoading = false
        })
    },
    getUploads () {
      let currentImgs = this.editor.getBody().getElementsByTagName('img')
      let currentImgPaths = []

      for (let i = 0; i < currentImgs.length; ++i) {
        let img = currentImgs[i]
        let srcUrl = new Url(img.src)

        currentImgPaths.push(srcUrl.query.substring(srcUrl.query.indexOf('?filePath=') + 10))
      }

      return currentImgPaths
    },
    fioDiff () {
      let d = diff.diffChars(this.myBiographyVersion.lastName, this.biographyForm.lastName)

      d.push({ value: ' ' })
      d.push(...diff.diffChars(this.myBiographyVersion.firstName, this.biographyForm.firstName))
      d.push({ value: ' ' })
      d.push(...diff.diffChars(this.myBiographyVersion.middleName, this.biographyForm.middleName))

      return this.cleanUp(d)
    },
    biographyDiff () {
      let b1 = he.escape(this.myBiographyVersion.bio || '').replace(/\n/g, '<br>')
      let b2 = he.escape(this.biographyForm.bio || '').replace(/\n/g, '<br>')

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
    clearBiographyForm () {
      Object.assign(this.biographyForm, {
        firstName: '',
        lastName: '',
        middleName: '',
        bio: '',
        updatedAt: undefined,
        countryId: null,
        professions: [],
        categories: []
      })
    },
    updateParent (data) {
      this.$emit('update:firstName', data.firstName)
      this.$emit('update:lastName', data.lastName)
      this.$emit('update:middleName', data.middleName)
      this.$emit('update:bio', data.bio)
      this.$emit('update:updatedAt', data.updatedAt)
      this.$emit('update:categories', data.categories)
    },
    doSave () {
      let that = this
      this.$validator.validateAll().then(result => {
        if (result) {
          that.saveLoading = true

          if (that.mode === 'edit') {
            let categoriesDiff = diff.diffArrays(that.inBiography.categories, that.biographyForm.categories)
            let added = []
            let deleted = []

            categoriesDiff.forEach(function (element) {
              if (element.added) {
                added.push(...element.value)
              } else if (element.removed) {
                deleted.push(...element.value)
              }
            })

            let professionsDiff = diff.diffArrays(that.inBiography.professions, that.biographyForm.professions)

            let addedProfessions = []
            let deletedProfessions = []

            professionsDiff.forEach(function (element) {
              if (element.added) {
                addedProfessions.push(...element.value)
              } else if (element.removed) {
                deletedProfessions.push(...element.value)
              }
            })

            biographyService.update({
              id: that.biographyForm.id,
              firstName: that.biographyForm.firstName,
              lastName: that.biographyForm.lastName,
              middleName: that.biographyForm.middleName,
              bio: that.biographyForm.bio,
              addCategories: added,
              deleteCategories: deleted,
              updatedAt: that.biographyForm.updatedAt,
              countryId: that.biographyForm.countryId,
              addProfessions: addedProfessions,
              deleteProfessions: deletedProfessions
            })
              .then(
                response => {
                  that.biographyForm.bio = response.data.bio
                  that.biographyForm.updatedAt = response.data.updatedAt
                  that.updateParent(that.biographyForm)

                  that.setAlertSuccess('Изменения сохранены.')

                  that.conflict = false
                  that.myBiographyVersion = {}
                },
                e => {
                  if (e.response.status === 409) {
                    that.$swal.fire({
                      text: 'Произошел конфликт или кто то обновил биографию пока вы работали с ней. Пожалуйста перенесите свои изменения в соответствии с текущей версией и попробуйте сохранить еще раз.',
                      type: 'error',
                      showCloseButton: true
                    })
                    Object.assign(that.myBiographyVersion, that.biographyForm)

                    Object.assign(that.biographyForm, e.response.data)
                    that.conflict = true
                    that.fioConflict = that.fioDiff()
                    that.biographyConflict = that.biographyDiff()
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
              bio: that.biographyForm.bio,
              addCategories: that.biographyForm.categories,
              countryId: that.biographyForm.countryId,
              addProfessions: that.biographyForm.professions
            })
              .then(
                () => {
                  that.clearBiographyForm()
                  that.setAlertSuccess('Биография создана. Вы можете увидеть ее в разделе Созданные мной.')
                  that.saveLoading = false
                  that.$validator.reset()
                  that.currentUserUploads = []
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
