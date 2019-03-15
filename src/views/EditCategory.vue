<template>
  <v-layout justify-center row>
    <v-flex xs12 sm8>
      <alert-message/>
      <v-layout justify-center row class="ma-0 pa-0" v-if="loadingCategory">
        <progress-circular/>
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
            <progress-circular/>
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
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'CategoryCard',
  mixins: [alert],
  components: { ProgressCircular, AlertMessage },
  data () {
    return {
      saving: false,
      loadingCategory: false,
      loadingImage: true,
      file: undefined,
      previewImagePath: undefined,
      currentImagePath: '',
      form: {
        id: '',
        name: '',
        imagePath: ''
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

      return fileService.getCategoryResourceUrl(this.form.imagePath)
    }
  },
  methods: {
    resetForm () {
      this.resetFile()
      this.form.id = ''
      this.form.name = ''
      this.form.imagePath = ''
      this.$validator.reset()
    },
    save () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          that.saving = true

          if (that._isEdit) {
            that.saving = true
            let formData = new FormData()

            formData.set('data', JSON.stringify({ name: that.form.name }))

            if (that.file) {
              formData.append('file', that.file)
            }

            biographyCategoryService.edit(that.categoryId, formData)
              .then(
                response => {
                  that.form.imagePath = response.data.imagePath
                  that.setAlertSuccess(CATEGORY_CHANGED)
                  that.saving = false
                  that.resetFile()
                }
              ).finally(() => {
                that.saving = false
              })
          } else {
            let formData = new FormData()

            formData.set('data', JSON.stringify({ name: that.form.name }))

            if (that.file) {
              formData.append('file', that.file)
            }

            biographyCategoryService.create(formData)
              .then(
                () => {
                  that.resetForm()
                  that.setAlertSuccess(CATEGORY_CREATED)
                  that.saving = false
                }
              ).finally(() => {
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
