<template>
  <v-layout justify-center row>
    <v-flex xs8>
      <alert-message/>
      <v-layout justify-center row class="ma-0 pa-0" v-if="loadingCategory">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-layout>
      <v-card v-else>
        <v-img
          :src="_imageSrc"
          height="200"
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="blue darken-3"></v-progress-circular>
          </v-layout>
        </v-img>
        <v-card-text style="justify-content: center">
          <v-form>
            <v-text-field
              v-validate="'required'"
              v-model="form.name"
              :error-messages="errors.collect('name')"
              label="Название категории"
              type="text"
              name="name"
            ></v-text-field>
            <input type="file" id="file" ref="file" style="display: none" accept="image/*"
                   v-on:change="handleFileUpload()"/>
            <v-btn block @click="selectFile" class="primary">Загрузить картинку</v-btn>
            <v-btn v-if="file" block color="red darken-3" @click="resetFile" class="white--text">Сбросить</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn color="blue darken-3" class="white--text" @click="save()" :loading="saving" :disabled="saving">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4>
    </v-flex>
  </v-layout>
</template>

<script>
import fileService from '../services/file-service'
import biographyCategoryService from '../services/biography-category-service'
import AlertMessage from '../components/alert/AlertMessage'
import { CATEGORY_CREATED, CATEGORY_CHANGED } from '../messages'
import alert from '../mixins/alert'

export default {
  name: 'CategoryCard',
  mixins: [alert],
  components: { AlertMessage },
  data () {
    return {
      saving: false,
      loadingCategory: false,
      loadingImage: true,
      file: undefined,
      previewImagePath: undefined,
      currentImagePath: 'image-placeholder.jpg',
      form: {
        id: '',
        name: '',
        imagePath: 'image-placeholder.jpg'
      }
    }
  },
  props: {
    categoryId: {
      type: Number
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        name: {
          required: () => 'Введите название категории'
        }
      }
    })
    if (this._isEdit) {
      this.loadCategory()
    }
  },
  computed: {
    _isEdit () {
      return !!this.categoryId
    },
    _imageSrc () {
      if (this.previewImagePath) {
        return this.previewImagePath
      }
      if (this.form.imagePath === 'image-placeholder.jpg') {
        return '/image-placeholder.jpg'
      }

      return fileService.getCategoryResourceUrl(this.form.imagePath)
    }
  },
  methods: {
    resetForm () {
      this.resetFile()
      this.form.id = ''
      this.form.name = ''
      this.form.imagePath = 'image-placeholder.jpg'
      this.$validator.reset()
    },
    save () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          that.saving = true

          if (that._isEdit) {
            that.saving = true

            biographyCategoryService.edit(that.categoryId, {
              name: that.form.name,
              imagePath: that.currentImagePath
            })
              .then(
                () => {
                  if (that.file) {
                    return new Promise(resolve => {
                      fileService.uploadCategoryResource(that.categoryId, that.file)
                        .then(
                          response => {
                            resolve(response.data.path)
                          }
                        )
                    })
                  }

                  return Promise.resolve(that.currentImagePath)
                }
              )
              .then(
                path => {
                  that.form.imagePath = path
                  that.setAlertSuccess(CATEGORY_CHANGED)
                  that.saving = false
                  that.resetFile()
                }
              )
              .catch(e => {
                that.saving = false
              })
          } else {
            biographyCategoryService.create({
              name: that.form.name,
              imagePath: 'image-placeholder.jpg'
            })
              .then(
                response => {
                  return response.data
                }
              )
              .then(
                category => {
                  return fileService.uploadCategoryResource(category.id, that.file)
                }
              )
              .then(
                () => {
                  that.resetForm()
                  that.setAlertSuccess(CATEGORY_CREATED)
                  that.saving = false
                }
              )
              .catch(e => {
                that.saving = false
              })
          }
        }
      })
    },
    selectFile () {
      this.$refs.file.click()
    },
    resetFile () {
      this.previewImagePath = undefined
      this.file = undefined
      this.form.imagePath = this.currentImagePath
      this.$refs.file.value = null
    },
    loadCategory () {
      let that = this
      that.loadingCategory = true

      biographyCategoryService.getCategory(this.categoryId)
        .then(
          response => {
            that.currentImagePath = response.data.imagePath
            that.form.id = response.data.id
            that.form.name = response.data.name
            that.form.imagePath = response.data.imagePath
            that.loadingCategory = false
          },
          e => {
            that.loadingCategory = false
          }
        )
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]

      let reader = new FileReader()

      reader.addEventListener('load', function () {
        this.previewImagePath = reader.result
      }.bind(this), false)

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    }
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style scoped>
  .file-select > .select-button {
    padding: 1rem;

    cursor: pointer;
    color: white;
    background-color: #2EA169;

    border-radius: .3rem;

    text-align: center;
    font-weight: bold;
  }

  .file-select > input[type="file"] {
    display: none;
  }
</style>
