<template>
  <v-list two-line class="pa-3 pt-2">
    <div v-for="(item, index) in items" :key="index">
      <v-divider v-if="index !== 0" class="m-0"></v-divider>
      <comment :id="'c' + item.id" :comment="item" @click-reply="clickReply"></comment>
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
    <comment-form @reset-reply="resetReply" :reply="reply" :reply-to-comment="replyToComment" :biography-id="biographyId"></comment-form>
  </v-list>
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
      replyToComment: {},
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
    clickReply (comment) {
      this.replyToComment = comment
      this.reply = true
    },
    resetReply () {
      this.replyToComment = null
      this.reply = false
    },
    infiniteLoad ($state) {
      let that = this

      biographyCommentService.getComments(this.biographyId, this.page)
        .then(
          response => {
            if (response.status === 200) {
              ++that.page
              that.items.push(...response.data.content)
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

</style>
