<template>
  <v-card-actions>
    <v-hover :open-delay="500">
      <like
        v-bind="$attrs"
        v-on="$listeners"
        :like="like"
        :unlike="unlike"
        class="ml-1"
      />
    </v-hover>
    <comment-icon v-bind="$attrs"/>
  </v-card-actions>
</template>

<script>
import Like from './LikeIcon.vue'
import CommentIcon from './CommentIcon.vue'
import likeService from '../../../services/like-service'

export default {
  name: 'BiographyCardActions',
  inheritAttrs: false,
  components: {
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
