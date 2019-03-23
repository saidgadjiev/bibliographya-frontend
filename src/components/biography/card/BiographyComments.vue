<template>
  <comments
    v-bind="$attrs"
    :add-comment="addComment"
    v-on="$listeners"
  />
</template>

<script>
import bigraphyCommentService from '../../../services/biography-comment-service'
import Comments from '../../comment/Comments'

export default {
  name: 'BiographyComments',
  inheritAttrs: false,
  components: { Comments },
  methods: {
    addComment (biographyId, comment) {
      return bigraphyCommentService.addComment(biographyId, comment)
    }
  }
}
</script>

<style scoped>

</style>
