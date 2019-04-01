<template>
  <v-card-actions>
    <like
      v-bind="$attrs"
      v-on="$listeners"
      :like="like"
      :unlike="unlike"
      class="ml-1"
    />
    <comment-icon v-bind="$attrs"/>
    <share-icon/>
  </v-card-actions>
</template>

<script>
import Like from './LikeIcon.vue'
import CommentIcon from './CommentIcon.vue'
import likeService from '../../../services/like-service'
import ShareIcon from './ShareIcon'

export default {
  name: 'BiographyCardActions',
  inheritAttrs: false,
  components: {
    ShareIcon,
    Like,
    CommentIcon
  },
  methods: {
    like (id) {
      return likeService.like(id)
    },
    unlike (id) {
      return likeService.unlike(id)
    }
  }
}
</script>

<style scoped>

</style>
