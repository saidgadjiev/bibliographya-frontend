<template>
  <v-form id="comments">
    <div v-if="replyToComment">
      ответ <a @click="gotoReply">{{ _replyToFirstName }}</a>&nbsp;
      <v-icon style="font-size: 18px" @click="resetReply">fas fa-times</v-icon>
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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),
    _replyToFirstName () {
      return this.replyToComment.user.firstName
    }
  },
  methods: {
    resetReply () {
      this.$emit('reset-reply')
    },
    gotoReply () {
      this.$vuetify.goTo('#_c' + this.replyToComment.id, this.options)
      let el = document.getElementById('_c' + this.replyToComment.id)

      el.classList.add('blue-grey', 'lighten-3')

      setTimeout(function () {
        el.classList.remove('blue-grey', 'lighten-3')
      }, 2000)
    },
    submit () {
      if (!this.isAuthenticated) {
        this.$router.push('/signIn')

        return
      }
      let that = this

      if (this.content && this.content !== '') {
        let json = {
          content: this.content
        }

        if (this.replyToComment) {
          json.parent = {
            id: this.replyToComment.id,
            firstName: this._replyToFirstName
          }
        }

        this.addComment(this.id, json)
          .then(
            response => {
              that.content = ''
              that.$emit('comment-added', response.data)
              that.$emit('update:commentsCount', that.commentsCount + 1)
            },
            e => {
              this.$log.error(e)
            }
          )
      }
    }
  }
}
</script>

<style scoped>

</style>
