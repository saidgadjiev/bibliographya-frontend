<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      flat
      :id="'_' + comment.id"
      class="comment-wrapper pa-2">
      <v-card-title primary-title class="pa-0">
        <div v-if="comment.parentId">
          <a :href="'/biography/' + comment.biographyId">{{ comment.lastName + ' ' + comment.firstName }}</a>
          <small class="grey--text">&nbsp;ответил&nbsp;</small>
          <a tabindex @click="gotoReply()"><strong
            class="grey--text">{{ comment.replyToFirstName }}</strong></a>
        </div>
        <div v-else>
          <a :href="'/biography/' + comment.biographyId">{{ comment.lastName + ' ' + comment.firstName }}</a>
        </div>
        <v-spacer></v-spacer>
        <div v-if="hover">
          <v-icon small @click="clickEdit" v-if="!edit">
            mdi-pencil
          </v-icon>
          <v-icon small @click="doDeleted" class="ml-1">
            fa fa-times
          </v-icon>
        </div>
      </v-card-title>
      <v-card-text class="pa-0">
        <edit-comment
          v-if="edit"
          @cancel="edit = !edit"
          @ok="edit = !edit"
          :comment-id="comment.id"
          :content="comment.content"
          v-on="$listeners"
        >
        </edit-comment>
        <div v-else>
        <span v-if="comment.parentId">
          <a :href="'/biography/' + comment.replyToBiographyId">{{ comment.replyToFirstName }}</a>{{ ', ' + comment.content }}
        </span>
          <span v-else>{{ comment.content }}</span>
        </div>
      </v-card-text>
      <v-card-actions class="pa-0">
        {{ getTimeDiff + ',' }}&nbsp;<a @click="reply">Ответить</a>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import biographyCommentService from '../../services/biography-comment-service'
import EditComment from './EditComment'
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
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
    comment: {
      required: true,
      type: Object
    },
    classes: {
      type: String
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    isMyComment () {
      return this.getUser.id === this.comment.userId
    },
    getTimeDiff () {
      const date1 = new Date(this.comment.createdAt)
      const date2 = new Date(Date.now())
      const yearDiff = Math.abs(date2.getFullYear() - date1.getFullYear())
      const monthDiff = Math.abs(date2.getMonth() - date1.getMonth())
      const dayDiff = Math.abs(date2.getDate() - date1.getDate())
      const hourDiff = Math.abs(date2.getHours() - date1.getHours())
      const minuteDiff = Math.abs(date2.getMinutes() - date1.getMinutes())
      return yearDiff !== 0 && yearDiff === 1
        ? 'a year ago'
        : yearDiff > 1
          ? yearDiff + ' years ago'
          : monthDiff !== 0 && monthDiff === 1
            ? 'a month ago'
            : monthDiff > 1
              ? monthDiff + ' months ago'
              : dayDiff !== 0 && dayDiff === 1
                ? 'a day ago'
                : dayDiff > 1
                  ? dayDiff + ' days ago'
                  : hourDiff !== 0 && hourDiff === 1
                    ? 'a hour ago'
                    : hourDiff > 1
                      ? hourDiff + ' hours ago'
                      : minuteDiff !== 0 && minuteDiff === 1
                        ? 'a minute ago'
                        : minuteDiff > 1
                          ? minuteDiff + ' minutes ago'
                          : 'seconds ago'
    }
  },
  methods: {
    clickEdit () {
      this.edit = !this.edit
      this.editContent = this.comment.content
    },
    doDeleted () {
      biographyCommentService.deleteComment(this.comment.biographyId, this.comment.id)
        .then(
          () => {
            this.$emit('comment-deleted')
          }
        )
    },
    gotoReply () {
      this.$vuetify.goTo('#c' + this.comment.parentId, this.options)
      let el = document.getElementById('c' + this.comment.parentId)

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
  @import '../../../static/bibliography.css';

  .comment-wrapper {
    position: relative;
    display: block;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
</style>
