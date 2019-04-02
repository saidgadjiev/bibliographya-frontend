<template>
  <list
    class="ml-0 mr-2"
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
    :reset-id="resetId"
    :add-id="addId"
    :new-item="newComment"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="item" slot-scope="{ item, index }">
      <comment
        v-bind.sync="item"
        @click-reply="clickReply(item)"
        @comment-deleted="commentDeleted(item, index)"
      ></comment>
    </template>
    <template v-if="!disableComments" slot="footer">
      <comment-form
        class="pl-2"
        :reply-to-comment="replyToComment"
        v-bind="_attrs"
        v-on="$listeners"
        @comment-added="commentAdded"
        @reset-reply="resetReply"
      ></comment-form>
    </template>
    <template slot="error" slot-scope="{ trigger }">
      <v-card flat>
        <v-card-text>
      <span class="font-weight-bold">
        Произошла ошибка
      </span>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="error" @click="trigger">
            Попробовать еще раз
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </list>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import biographyCommentService from '../../services/biography-comment-service'
import List from '../list/List'

export default {
  name: 'Comments',
  inheritAttrs: false,
  data () {
    return {
      newComment: {},
      addId: +new Date(),
      deleteId: +new Date(),
      resetId: +new Date(),
      deleteIndex: 0,
      infiniteId: +new Date(),
      replyToComment: null,
      reply: false,
      page: 0
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    commentsCount: {
      type: Number
    },
    disableComments: Boolean
  },
  computed: {
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          id: this.id,
          commentsCount: this.commentsCount
        }
      )
    }
  },
  methods: {
    commentAdded (comment) {
      this.newComment = comment
      ++this.addId

      this.replyToComment = null
      this.$emit('comment-added', comment)
    },
    commentDeleted (comment, index) {
      this.deleteIndex = index
      ++this.deleteId
      this.$emit('update:commentsCount', this.commentsCount - 1)
      this.$emit('comment-deleted', comment)
    },
    clickReply (comment) {
      this.replyToComment = comment
      this.$vuetify.goTo('#comments', {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    },
    resetReply () {
      this.replyToComment = null
    },
    infiniteLoad (limit, offset) {
      return biographyCommentService.getComments(this.id, limit, offset, 'sort=created_at,asc')
    }
  },
  watch: {
    '$route' (to, from) {
      this.resetId += 1
    }
  },
  components: {
    List,
    Comment,
    CommentForm
  }
}
</script>

<style scoped>
</style>
