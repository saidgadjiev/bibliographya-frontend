<template>
  <v-hover>
    <v-card
      v-on:dblclick="reply"
      slot-scope="{ hover }"
      flat
      :id="'_c' + id"
      class="comment-wrapper pa-2">
      <v-card-title primary-title class="pa-0">
        <div v-if="parentId">
          <router-link class="bib-a" :to="_authorAccountLink">{{ _authorName }}</router-link>
          <small class="grey--text">&nbsp;ответил&nbsp;</small>
          <a @click="gotoReply()"><strong class="grey--text">{{ _repliedFirstName }}</strong></a>
        </div>
        <div v-else>
          <router-link  class="bib-a" :to="_authorAccountLink">{{ _authorName }}</router-link>
        </div>
        <v-spacer></v-spacer>
        <div v-if="hover || _showCommentButtons">
          <v-icon v-if="_showEdit" small @click="clickEdit">
            mdi-pencil
          </v-icon>
          <v-icon v-if="_showRemove" small @click="doDeleted" class="ml-1">
            fa fa-times
          </v-icon>
        </div>
      </v-card-title>
      <v-card-text class="pa-0">
        <edit-comment
          v-if="edit"
          @cancel="edit = !edit"
          @ok="edit = !edit"
          :comment-id="id"
          :content.sync="content"
        >
        </edit-comment>
        <div v-else>
          <span v-if="parentId">
            <router-link class="bib-a" :to="_repliedBiographyLink">{{ _repliedFirstName }}</router-link>
            <span v-html="', ' + _content"></span>
          </span>
          <span style="white-space: pre-wrap;" v-else v-html="_content"></span>
        </div>
        <h4>{{ _getTimeDiff + ',' }}&nbsp;<a class="font-weight-regular" @click="reply">Ответить</a></h4>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { ROLES, DATE_FORMAT } from '../../config'
import biographyCommentService from '../../services/biography-comment-service'
import EditComment from './EditComment'
import { mapGetters } from 'vuex'
import twemoji from 'twemoji'

export default {
  name: 'Comment',
  inheritAttrs: false,
  data () {
    return {
      edit: false,
      editContent: '',
      options: {
        duration: 300,
        offset: 100,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: {
    id: {
      type: Number
    },
    content: {
      type: String
    },
    createdAt: {
      type: String
    },
    biographyId: {
      type: Number
    },
    userId: {
      type: Number
    },
    parentId: {
      type: Number
    },
    parentDeleted: {
      type: Boolean
    },
    user: {
      type: Object
    },
    parentUser: {
      type: Object
    },
    classes: {
      type: String
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'isAuthenticated',
      'isAuthorized'
    ]),
    _repliedFirstName () {
      return this.parentUser.firstName
    },
    _authorName () {
      return this.user.lastName + ' ' + this.user.firstName
    },
    _authorAccountLink () {
      return '/profile/' + this.userId
    },
    _repliedBiographyLink () {
      return '/profile/' + this.parentUser.userId
    },
    _showCommentButtons () {
      return this.$vuetify.breakpoint.smAndDown
    },
    _showEdit () {
      if (this.edit) {
        return false
      }
      if (!this.isAuthenticated) {
        return false
      }

      return this.getUserId === this.userId
    },
    _showRemove () {
      if (!this.isAuthenticated) {
        return false
      }
      if (this.getUserId === this.userId) {
        return true
      }
      if (this.isAuthorized([ROLES.ROLE_MODERATOR])) {
        return true
      }

      return this.getUserId === this.userId
    },
    _getTimeDiff () {
      return this.$moment(this.createdAt, DATE_FORMAT).fromNow()
    },
    _content () {
      return twemoji.parse(this.content)
    }
  },
  methods: {
    clickEdit () {
      this.edit = !this.edit
      this.editContent = this.content
    },
    doDeleted () {
      biographyCommentService.deleteComment(this.biographyId, this.id)
        .then(
          () => {
            this.$emit('comment-deleted')
          }
        )
    },
    gotoReply () {
      let id = '_c' + this.parentId
      let el = document.getElementById(id)

      if (el) {
        this.$vuetify.goTo('#' + id, this.options)

        el.classList.add('highlight')

        setTimeout(function () {
          el.classList.remove('highlight')
        }, 2000)
      }
    },
    reply () {
      this.$emit('click-reply')
    }
  },
  components: {
    EditComment
  }
}
</script>

<style scoped>
  .comment-wrapper {
    position: relative !important;
    display: block !important;
    margin-bottom: -1px !important;
    background-color: #fff !important;
    border: 1px solid rgba(0, 0, 0, 0.125) !important;
  }

  .highlight {
    background-color: #B3E5FC !important;
  }

  .comment-wrapper >>> img.emoji {
    height: 1em !important;
    width: 1em !important;
    margin: 0 .05em 0 .1em !important;
    vertical-align: -0.1em !important;
  }
</style>
