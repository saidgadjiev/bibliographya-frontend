<template>
  <list
    class="ml-0 mr-0"
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
    :add-id="addId"
    :new-item="newComment"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="item" slot-scope="{ item, index }">
      <comment
        :comment="item"
        v-on:update:content="item.content = $event"
        @click-reply="clickReply(item)"
        @comment-deleted="commentDeleted(item, index)"
      ></comment>
    </template>
    <template slot="footer">
      <comment-form
        v-bind="attrs"
        v-on="$listeners"
        class="pl-2"
        @comment-added="commentAdded"
        :reply-to-comment="replyToComment"
        :biography-id="id"
      ></comment-form>
    </template>
  </list>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import biographyCommentService from '../../services/biography-comment-service'
import InfiniteLoading from 'vue-infinite-loading'
import List from '../list/List'

export default {
  name: 'Comments',
  data () {
    return {
      newComment: {},
      addId: +new Date(),
      deleteId: +new Date(),
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
    }
  },
  computed: {
    attrs () {
      return Object.assign({},
        this.$attrs,
        {
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
      this.$vuetify.goTo('#commentForm', {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    },
    infiniteLoad (limit, offset) {
      return biographyCommentService.getComments(this.id, limit, offset, 'sort=created_at,asc')
    }
  },
  components: {
    List,
    Comment,
    InfiniteLoading,
    CommentForm
  }
}
</script>

<style scoped>
</style>
