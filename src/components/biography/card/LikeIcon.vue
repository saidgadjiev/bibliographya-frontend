<template>
  <div class="d-flex align-center">
    <v-btn @click="clickLike" icon flat color="blue darken-1" :loading="likeLoading" :disabled="likeLoading">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <span style="font-size: 18px; color: #007bff">{{ _animatedLikesCount }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TweenLite } from 'gsap'

export default {
  name: 'LikeIcon',
  inheritAttrs: false,
  data () {
    return {
      animatedLikesCount: 0,
      likeLoading: false
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
    ...mapGetters([
      'isAuthenticated'
    ]),
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
      if (!this.isAuthenticated) {
        this.$router.push('/signIn')

        return
      }
      this.likeLoading = true
      let that = this

      if (this.liked) {
        this.unlike(this.id)
          .then(
            () => {
              this.$emit('update:likesCount', this.likesCount + (this.liked ? -1 : 1))
              this.$emit('update:liked', !this.liked)
              that.likeLoading = false
            },
            e => {
              console.log(e)
              that.likeLoading = false
            }
          )
      } else {
        this.like(this.id)
          .then(
            () => {
              this.$emit('update:likesCount', this.likesCount + (this.liked ? -1 : 1))
              this.$emit('update:liked', !this.liked)
              that.likeLoading = false
            },
            e => {
              console.log(e)
              that.likeLoading = false
            }
          )
      }
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
