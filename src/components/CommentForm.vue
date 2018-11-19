<template>
  <v-form
    class="pa-3 pt-2"
  >
    <div v-if="reply">
    <span>
      ответ <a tabindex @click="gotoReply">{{ replyToComment.firstName }}</a>
    </span>
    <span>
      <v-icon style="font-size: 18px" @click="resetReply">fas fa-times</v-icon>
    </span>
    </div>
    <v-textarea
      auto-grow
      rows="1"
      append-outer-icon="fas fa-paper-plane"
      :append-outer-icon-cb="submit"
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
    reply: {
      type: Boolean,
      default: false
    },
    replyToComment: {
      type: Object
    },
    parentId: {
      type: Number
    }
  },
  methods: {
    resetReply () {
      this.$emit('reset-reply')
    },
    gotoReply () {
      this.$vuetify.goTo('#c' + this.replyToComment.id, this.options)
      let el = document.getElementById('c' + this.replyToComment.id)

      el.classList.add('blue-grey', 'lighten-3')

      setTimeout(function () {
        el.classList.remove('blue-grey', 'lighten-3')
      }, 2000)
    },
    clear () {
      this.content = ''
    },
    submit () {
      let that = this

      if (this.content !== '') {
        biographyCommentService.addComment(this.biographyId, {
          content: this.content,
          parentId: this.parentId
        })
          .then(
            response => {
              that.clear()
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
