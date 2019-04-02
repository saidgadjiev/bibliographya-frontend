<template>
  <v-card-actions>
    <v-btn
      v-show="_showPublish"
      @click="publish"
      class="ma-0 white--text"
      color="green darken-2"
      :loading="publishLoading"
      :disabled="publishLoading"
    >
      Опубликовать
    </v-btn>
    <v-btn
      v-show="_showUnPublish"
      @click="unpublish"
      class="ma-0 white--text"
      color="deep-purple darken-4"
      :loading="unpublishLoading"
      :disabled="unpublishLoading"
    >
      Снять с публикации
    </v-btn>
    <div v-if="_showAdditinalSettings">
      <v-switch v-model="_onlyInCategory" label="Отображать только в категориях"
                :loading="_isRequest(Request.SET_ONLY_IN_CATEGORY)">
      </v-switch>
      <v-switch v-model="_anonymousCreator" label="Анонимно" :loading="_isRequest(Request.ANONYMOUS_CREATOR)">
      </v-switch>
    </div>
  </v-card-actions>
</template>

<script>
import { PUBLISHED, UNPUBLISHED, CANT_PUBLISH } from '../../../messages'
import { PUBLISH_STATUS, REQUEST } from '../../../config'
import biographyService from '../../../services/biography-service'
import alert from '../../../mixins/alert'
import request from '../../../mixins/request'

export default {
  name: 'BiographyCardPublishTitle',
  inheritAttrs: false,
  mixins: [alert, request],
  data () {
    return {
      publishLoading: false,
      unpublishLoading: false
    }
  },
  props: {
    id: {
      type: Number
    },
    publishStatus: {
      type: Number
    },
    onlyInCategory: {
      type: Boolean
    },
    anonymousCreator: {
      type: Boolean
    },
    userId: Number
  },
  computed: {
    _showPublish () {
      return this.publishStatus === PUBLISH_STATUS.NOT_PUBLISHED
    },
    _showUnPublish () {
      return this.publishStatus === PUBLISH_STATUS.PUBLISHED
    },
    _onlyInCategory: {
      get () {
        return this.onlyInCategory
      },
      set (val) {
        let that = this

        that.setRequest(REQUEST.SET_ONLY_IN_CATEGORY)
        biographyService.setOnlyInCategory(this.id, val)
          .then(
            () => {
              this.$emit('update:onlyInCategory', val)
            }
          )
          .finally(() => {
            that.clearRequest()
          })
      }
    },
    _anonymousCreator: {
      get () {
        return this.anonymousCreator
      },
      set (val) {
        let that = this

        that.setRequest(REQUEST.ANONYMOUS_CREATOR)
        biographyService.anonymousCreator(this.id, val)
          .then(
            () => {
              this.$emit('update:anonymousCreator', val)
            }
          )
          .finally(() => {
            that.clearRequest()
          })
      }
    },
    _showAdditinalSettings () {
      return !this.userId
    }
  },
  methods: {
    publish () {
      this.publishLoading = true
      let that = this

      biographyService.publish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.PUBLISHED)
            that.setAlertSuccess(PUBLISHED)
            that.publishLoading = false
          },
          e => {
            if (e.response.status === 400) {
              that.$swal.fire({
                text: CANT_PUBLISH,
                type: 'error',
                showCloseButton: true
              })
            }
            that.publishLoading = false
          }
        )
    },
    unpublish () {
      this.unpublishLoading = true
      let that = this

      biographyService.unpublish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.NOT_PUBLISHED)
            that.setAlertSuccess(UNPUBLISHED)
            that.unpublishLoading = false
          },
          e => {
            that.unpublishLoading = false
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
