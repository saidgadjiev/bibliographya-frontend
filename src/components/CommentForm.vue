<template>
  <v-form id="commentForm">
    <div v-if="replyToComment">
    <span>
      ответ <a tabindex @click="gotoReply">{{ replyToComment.firstName }}</a>
    </span>
    <span>
      <v-icon style="font-size: 18px" @click="$emit('reset-reply')">fas fa-times</v-icon>
    </span>
    </div>
    <v-textarea
      auto-grow
      rows="1"
      @click:append-outer="submit"
      append-outer-icon="fas fa-paper-plane"
      placeholder="Написать комментарий..."
      v-model="content"
      class="pt-0"
    ></v-textarea>
  </v-form>
</template>

<script>
import biographyCommentService from '../services/biography-comment-service'

export default {
  name: 'CommentForm',
  data () {
    return {
      content: '',
      options: {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: {
    biographyId: {
      type: Number,
      required: true
    },
    replyToComment: {
      type: Object
    }
  },
  methods: {
    gotoReply () {
      this.$vuetify.goTo('#c' + this.replyToComment.id, this.options)
      let el = document.getElementById('c' + this.replyToComment.id)

      el.classList.add('blue-grey', 'lighten-3')

      setTimeout(function () {
        el.classList.remove('blue-grey', 'lighten-3')
      }, 2000)
    },
    submit () {
      let that = this
      let username = this.$store.getters.getUsername
      let biography = this.$store.getters.getBiographyByUsername(username)

      if (this.content !== '') {
        biographyCommentService.addComment(this.biographyId, {
          content: this.content,
          parentId: this.replyToComment ? this.replyToComment.id : null,
          firstName: biography.firstName,
          lastName: biography.lastName,
          replyToFirstName: this.replyToComment ? this.replyToComment.firstName : null,
          replyToUserName: this.replyToComment ? this.replyToComment.userName : null
        })
          .then(
            response => {
              that.content = ''
              that.$emit('comment-added', response.data)
            },
            e => {
              console.log(e)
            }
          )
      }
    }
  }
}
</script>

<style scoped>

</style>
