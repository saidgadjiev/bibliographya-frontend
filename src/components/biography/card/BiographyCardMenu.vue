<template>
  <v-menu left close-on-content-click v-model="menuVisible">
    <template #activator="{ on }">
    <v-btn
      class="absolute-activator"
      absolute
      right
      icon
      v-on="on"
    >
      <v-icon :small="$vuetify.breakpoint.smAndDown" color="blue darken-3">{{ _icon }}</v-icon>
    </v-btn>
    </template>
    <v-list dense>
      <v-list-tile
        :disabled="_isRequest(Request.PUBLISH)"
        v-if="_showPublish"
        @click="doPublish"
      >
        <v-list-tile-title>
          {{ _publishTitle }}
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-if="_showDelete"
        @click="remove"
      >
        <v-list-tile-title>Удалить</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-if="_showEdit"
        @click="edit"
      >
        <v-list-tile-title>Редактировать</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-if="_showSuggest"
        @click.stop="suggestFix"
      >
        <v-list-tile-title>Предложить исправление</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        :disabled="_isRequest(Request.ANONYMOUS_CREATOR)"
        v-if="_showAnonymousCreator"
        @click="setAnonymousCreator"
      >
        <v-list-tile-title>
          {{ _anonymousCreatorTitle }}
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        :disabled="_isRequest(Request.DISABLE_COMMENTS)"
        v-if="_showDeleteComments"
        @click="doDisableComments"
      >
        <v-list-tile-title>{{ _disableCommentsTitle }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <create-fix-suggest-dialog
      :biography-id="id"
      :visible.sync="fixDialogVisible"
    ></create-fix-suggest-dialog>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { ROLES, PUBLISH_STATUS, MODERATION_STATUS, REQUEST } from '../../../config'
import biographyService from '../../../services/cache-biography-service'
import CreateFixSuggestDialog from '../../fix/dialog/CreateFixSuggestDialog.vue'
import { ENABLE_COMMENTS, DISABLE_COMMENTS, PUBLISHED, UNPUBLISHED, CANT_PUBLISH } from '../../../messages'
import alert from '../../../mixins/alert'
import request from '../../../mixins/request'

export default {
  name: 'BiographyCardMenu',
  inheritAttrs: false,
  mixins: [alert, request],
  data () {
    return {
      menuVisible: false,
      fixDialogVisible: false,
      reportDialogVisible: false
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    creatorId: {
      type: Number
    },
    userId: {
      type: Number
    },
    onlyInCategory: {
      type: Boolean
    },
    disableComments: {
      type: Boolean
    },
    anonymousCreator: {
      type: Boolean
    },
    publishStatus: {
      type: Number
    },
    moderationStatus: {
      type: Number
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'isAuthenticated',
      'isAuthorized'
    ]),
    _showAnonymousCreator () {
      return this._isIAuthor && !this.userId
    },
    _isIAuthor () {
      if (!this.isAuthenticated) {
        return false
      }

      return this.creatorId === this.getUserId
    },
    _showDelete () {
      if (this.userId) {
        return false
      }
      if (!this.isAuthenticated) {
        return false
      }
      if (this.isAuthorized([ROLES.ROLE_MODERATOR])) {
        return true
      }
      if (this.getUserId === this.creatorId) {
        return true
      }

      return false
    },
    _showEdit () {
      if (!this.isAuthenticated) {
        return false
      }
      if (this.isAuthorized([ROLES.ROLE_MODERATOR])) {
        return true
      }
      if (this.getUserId === this.creatorId) {
        return true
      }

      return false
    },
    _showSuggest () {
      if (!this.isAuthenticated) {
        return true
      }

      return this.creatorId !== this.getUserId
    },
    _icon () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'fas fa-angle-down'
      }

      return 'fas fa-ellipsis-h'
    },
    _disableCommentsTitle () {
      return this.disableComments ? ENABLE_COMMENTS : DISABLE_COMMENTS
    },
    _showDeleteComments () {
      return this._isIAuthor
    },
    _showPublish () {
      return this.moderationStatus === MODERATION_STATUS.APPROVED && (this._isIAuthor || this.isAuthorized([ROLES.ROLE_MODERATOR]))
    },
    _publishTitle () {
      return this.publishStatus === PUBLISH_STATUS.PUBLISHED ? 'Снять с публикации' : 'Опубликовать'
    },
    _anonymousCreatorTitle () {
      return this.anonymousCreator ? 'Показать автора' : 'Скрыть автора'
    },
    _isPublished () {
      return this.publishStatus === PUBLISH_STATUS.PUBLISHED
    }
  },
  methods: {
    setAnonymousCreator () {
      let that = this

      that.menuVisible = false
      that.setRequest(REQUEST.ANONYMOUS_CREATOR)
      let returnFields

      if (this.anonymousCreator) {
        returnFields = ['creatorId']
      }

      biographyService.anonymousCreator(this.id, !this.anonymousCreator, returnFields)
        .then(
          response => {
            if (that.anonymousCreator) {
              that.$emit('update:creator', response.data.creator)
            } else {
              that.$emit('update:creator', null)
            }
            that.$emit('update:anonymousCreator', !that.anonymousCreator)
          }
        ).finally(() => {
          that.clearRequest()
        })
    },
    doPublish () {
      if (this._isPublished) {
        this.unPublish()
      } else {
        this.publish()
      }
    },
    publish () {
      let that = this

      that.menuVisible = false
      that.setRequest(REQUEST.PUBLISH)
      biographyService.publish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.PUBLISHED)
            that.setAlertSuccess(PUBLISHED)
          },
          e => {
            if (e.response.status === 400) {
              that.$swal.fire({
                text: CANT_PUBLISH,
                type: 'error',
                showCloseButton: true
              })
            }
          }
        )
        .finally(() => {
          that.clearRequest()
        })
    },
    unPublish () {
      let that = this

      that.menuVisible = false
      that.setRequest(REQUEST.PUBLISH)
      biographyService.unPublish(this.id)
        .then(
          () => {
            that.$emit('update:publishStatus', PUBLISH_STATUS.NOT_PUBLISHED)
            that.setAlertSuccess(UNPUBLISHED)
          }
        ).finally(() => {
          that.clearRequest()
        })
    },
    doDisableComments () {
      let that = this

      that.menuVisible = false
      that.setRequest(REQUEST.DISABLE_COMMENTS)
      biographyService.disableComments(this.id, !this.disableComments)
        .then(
          () => {
            this.$emit('update:disableComments', !that.disableComments)
          }
        ).finally(() => {
          that.clearRequest()
        })
    },
    suggestFix () {
      this.menuVisible = false
      if (!this.isAuthenticated) {
        this.$router.push('/signIn')
      }

      this.fixDialogVisible = true
    },
    remove () {
      let that = this

      that.menuVisible = false
      biographyService.deleteBiography(this.id)
        .then(
          () => {
            that.$emit('biography-removed', that.id)
          }
        )
    },
    edit () {
      this.$router.push('/edit/biographies/' + this.id)
    }
  },
  components: {
    CreateFixSuggestDialog
  }
}
</script>

<style scoped>
  .absolute-activator {
    top: 10px;
  }
</style>
