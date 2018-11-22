<template>
  <div class="pa-3 pb-0">
  <div class="list-group list-group-flush">
    <comment
      v-for="(item, index) in items"
      :key="index"
      :id="'c' + item.id"
      :comment="item"
      @click-reply="clickReply"
      @comment-deleted="commentDeleted(index)"
    ></comment>
  </div>
    <infinite-loading @infinite="infiniteLoad">
      <div slot="spinner">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <comment-form
      class="pl-2"
      @comment-added="commentAdded"
      :reply-to-comment="replyToComment"
      :biography-id="biographyId"
    ></comment-form>
  </div>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import biographyCommentService from '../services/biography-comment-service'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Comments',
  data () {
    return {
      limit: 20,
      offset: 0,
      replyToComment: null,
      reply: false,
      items: [],
      page: 0
    }
  },
  props: {
    biographyId: {
      type: Number,
      required: true
    }
  },
  methods: {
    commentAdded (comment) {
      this.items.push(comment)
      this.replyToComment = null
      this.$emit('comment-added')
    },
    commentDeleted (index) {
      this.items.splice(index, 1)
      this.$emit('comment-deleted')
    },
    clickReply (comment) {
      this.replyToComment = comment
      this.reply = true
      this.$vuetify.goTo('#commentForm', {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    },
    infiniteLoad ($state) {
      let that = this

      biographyCommentService.getComments(this.biographyId, this.limit, this.offset)
        .then(
          response => {
            if (response.status === 200) {
              that.items.push(...response.data.content)
              that.offset += response.data.content.length
              $state.loaded()
            } else {
              $state.complete()
            }
          }
        )
    }
  },
  components: {
    Comment,
    InfiniteLoading,
    CommentForm
  }
}
</script>

<style scoped>
  @import '../../static/bibliography.css';
</style>
