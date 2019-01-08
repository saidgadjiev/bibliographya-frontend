<template>
    <a tabindex @click="clickLike" style="text-decoration: none">
      <v-icon color="blue darken-1">{{ icon }}</v-icon>
      <span style="font-size: 18px">{{ _animatedLikesCount }}</span>
    </a>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  name: 'Like',
  data () {
    return {
      animatedLikesCount: 0
    }
  },
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
    },
    like: Function,
    unlike: Function
  },
  computed: {
    _animatedLikesCount () {
      return this.animatedLikesCount
    },
    icon () {
      return this.liked ? 'fas fa-heart' : 'far fa-heart'
    }
  },
  created () {
    this.animatedLikesCount = this.likesCount
  },
  methods: {
    clickLike () {
      if (this.liked) {
        this.unlike(this.id)
      } else {
        this.like(this.id)
      }
      this.$emit('update:likesCount', this.likesCount + (this.liked ? -1 : 1))
      this.$emit('update:liked', !this.liked)
    }
  },
  watch: {
    likesCount (newValue) {
      TweenLite.to(this.$data, 0.5, { animatedLikesCount: newValue, roundProps: 'animatedLikesCount' })
    }
  }
}
</script>

<style scoped>
</style>
