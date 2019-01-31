<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <v-textarea
        class="mt-0 pt-0"
        auto-grow
        type="text"
        v-validate="'required'"
        :error-messages="errors.collect('content')"
        name="content"
        v-model="editContent"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small flat @click="$emit('cancel')" :disabled="loading">Отмена</v-btn>
      <v-btn small class="primary" @click="doEdit" :loading="loading" :disabled="loading">Сохранить</v-btn>
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
      loading: false,
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
  created () {
    this.editContent = this.content
    this.$validator.localize('ru', {
      custom: {
        content: {
          required: () => 'Введите комментарий'
        }
      }
    })
  },
  methods: {
    doEdit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let that = this
          this.loading = true

          biographyCommentService.updateContent(this.commentId, this.editContent)
            .then(
              () => {
                that.$emit('update:content', that.editContent)
                that.$emit('ok')
                that.loading = false
              },
              e => {
                that.$log.error(e)
                that.loading = false
              }
            )
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
