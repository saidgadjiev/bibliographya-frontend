<template>
    <a tabindex @click="clickLike" style="text-decoration: none">
      <v-icon color="blue darken-1">{{ icon }}</v-icon>
      <span style="font-size: 18px">{{ likesCount }}</span>
    </a>
</template>

<script>
import likeService from '../services/like-service'

export default {
  name: 'Like',
  props: {
    id: {
      type: Number
    },
    likesCount: {
      type: Number,
      default: 0
    },
    liked: {
      type: Boolean
    }
  },
  computed: {
    icon () {
      return this.liked ? 'fas fa-heart' : 'far fa-heart'
    }
  },
  methods: {
    clickLike () {
      if (this.liked) {
        likeService.unlike(this.id)
      } else {
        likeService.like(this.id)
      }
      this.$emit('update:likesCount', this.likesCount + (this.liked ? -1 : 1))
      this.$emit('update:liked', !this.liked)
    }
  }
}
</script>

<style scoped>
</style>
