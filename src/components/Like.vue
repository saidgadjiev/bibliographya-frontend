<template>
    <a tabindex @click="clickLike" style="text-decoration: none">
      <v-icon color="blue darken-1">{{ icon }}</v-icon>
      <span style="font-size: 18px">{{ biography.likesCount }}</span>
    </a>
</template>

<script>
import likeService from '../services/like-service'

export default {
  name: 'Like',
  props: {
    biography: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon () {
      return this.biography.liked ? 'fas fa-heart' : 'far fa-heart'
    }
  },
  methods: {
    clickLike () {
      if (this.biography.liked) {
        likeService.unlike(this.biography.id)
      } else {
        likeService.like(this.biography.id)
      }
      this.$emit('like-toggled')
    }
  }
}
</script>

<style scoped>
</style>
