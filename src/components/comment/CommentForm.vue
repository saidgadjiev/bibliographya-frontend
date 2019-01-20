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
export default {
  name: 'CommentForm',
  inheritAttrs: false,
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
    id: {
      type: Number,
      required: true
    },
    commentsCount: {
      type: Number
    },
    replyToComment: {
      type: Object
    },
    addComment: Function
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

      if (this.content !== '') {
        this.addComment(this.id, {
          content: this.content,
          parent: this.replyToComment
        })
          .then(
            response => {
              that.content = ''
              that.$emit('comment-added', response.data)
              that.$emit('update:commentsCount', that.commentsCount + 1)
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
