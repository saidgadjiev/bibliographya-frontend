<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      flat
      :id="'_c' + id"
      class="comment-wrapper pa-2">
      <v-card-title primary-title class="pa-0">
        <div v-if="parentId">
          <router-link class="bibliographya-a" :to="_authorBiographyLink">{{ _authorName }}</router-link>
          <small class="grey--text">&nbsp;ответил&nbsp;</small>
          <a @click="gotoReply()"><strong class="grey--text">{{ _repliedFirstName }}</strong></a>
        </div>
        <div v-else>
          <router-link  class="bibliographya-a" :to="_authorBiographyLink">{{ _authorName }}</router-link>
        </div>
        <v-spacer></v-spacer>
        <div v-if="hover">
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
            <router-link class="bibliographya-a" :to="_repliedBiographyLink">{{ _repliedFirstName }}</router-link>{{ ', ' + content }}
          </span>
          <span v-else>{{ content }}</span>
        </div>
        <h4>{{ getTimeDiff + ',' }}&nbsp;<a class="font-weight-regular" @click="reply">Ответить</a></h4>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { ROLES } from '../../config'
import biographyCommentService from '../../services/biography-comment-service'
import EditComment from './EditComment'
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
  inheritAttrs: false,
  data () {
    return {
      edit: false,
      editContent: '',
      options: {
        duration: 300,
        offset: -100,
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
    user: {
      type: Object
    },
    parent: {
      type: Object
    },
    classes: {
      type: String
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'isAuthenticated',
      'isAuthorized'
    ]),
    _repliedFirstName () {
      return this.parent.user.firstName
    },
    _authorName () {
      return this.user.lastName + ' ' + this.user.firstName
    },
    _authorBiographyLink () {
      return '/biography/' + this.biographyId
    },
    _repliedBiographyLink () {
      return '/biography/' + this.parent.biographyId
    },
    _showEdit () {
      if (this.edit) {
        return false
      }
      if (!this.isAuthenticated) {
        return false
      }

      return this.getUser.id === this.userId
    },
    _showRemove () {
      if (!this.isAuthenticated) {
        return false
      }
      if (this.getUser.id === this.userId) {
        return true
      }
      if (this.isAuthorized([ROLES.ROLE_MODERATOR])) {
        return true
      }

      return this.getUser.id === this.userId
    },
    getTimeDiff () {
      return this.$moment(new Date(this.createdAt)).fromNow()
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
      this.$vuetify.goTo('#_c' + this.id, this.options)
      let el = document.getElementById('_c' + this.parentId)

      el.classList.add('blue-grey', 'lighten-3')

      setTimeout(function () {
        el.classList.remove('blue-grey', 'lighten-3')
      }, 2000)
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
</style>
