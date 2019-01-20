<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <v-textarea
        class="mt-0 pt-0"
        auto-grow
        type="text"
        v-model="newContent"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small flat @click="$emit('cancel')">Отмена</v-btn>
      <v-btn small class="primary" @click="doEdit">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import biographyCommentService from '../../services/biography-comment-service'

export default {
  name: 'EditComment',
  inheritAttrs: false,
  data () {
    return {
      editContent: ''
    }
  },
  props: {
    commentId: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    newContent: {
      get () {
        return this.content
      },
      set (val) {
        this.editContent = val
      }
    }
  },
  methods: {
    doEdit () {
      let that = this

      biographyCommentService.updateContent(this.commentId, this.editContent)
        .then(
          () => {
            that.$emit('update:content', that.editContent)
            that.$emit('ok')
          },
          e => {
            console.log(e)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
