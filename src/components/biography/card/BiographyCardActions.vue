<template>
  <v-card-actions>
    <like
      v-bind="$attrs"
      v-on="$listeners"
      class="ml-1"
    />
    <comment-icon v-bind="$attrs"/>
  </v-card-actions>
</template>

<script>
import Like from './LikeIcon.vue'
import CommentIcon from './CommentIcon.vue'

export default {
  name: 'BiographyCardActions',
  inheritAttrs: false,
  components: {
    Like,
    CommentIcon
  }
}
</script>

<style scoped>

</style>
