<template>
  <v-form id="comments">
    <div v-if="replyToComment">
      ответ <a @click="gotoReply">{{ _replyToFirstName }}</a>&nbsp;
      <v-icon style="font-size: 18px" @click="resetReply">fas fa-times</v-icon>
    </div>
    <div style="position: relative; padding-right:40px">
      <v-textarea
        v-on:keydown.enter.exact.prevent="enterPressed"
        auto-grow
        :rows="rows"
        placeholder="Комментарий..."
        v-model="content"
        class="pt-0 mt-0"
      ></v-textarea>
      <v-btn
        flat
        icon
        color="blue darken-1"
        @click="submit"
        absolute
        style="top:0; right:0"
        :disabled="submitting"
        :loading="submitting"
      >
        <v-icon>fas fa-paper-plane</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentForm',
  inheritAttrs: false,
  data () {
    return {
      rows: 1,
      content: '',
      submitting: false,
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
    enterPressed () {
      this.submit()
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
          json.parentId = this.replyToComment.id
        }

        that.submitting = true
        this.addComment(this.id, json)
          .then(
            response => {
              that.content = ''
              that.$emit('comment-added', response.data)
              that.$emit('update:commentsCount', that.commentsCount + 1)
            },
            e => {}
          )
          .finally(() => {
            that.submitting = false
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
