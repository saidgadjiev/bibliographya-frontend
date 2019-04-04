<template>
  <div class="ml-4 d-flex align-center">
    <v-icon color="blue darken-1" @click="gotoComments">mdi-comment-outline</v-icon>
    <span style="font-size: 18px;color: #007bff" class="pl-1">{{ commentsCount }}</span>
  </div>
</template>

<script>
import { BIOGRAPHY_CARD_MODE } from '../../../../config'

export default {
  name: 'CommentIcon',
  inheritAttrs: false,
  props: {
    id: {
      type: Number
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: BIOGRAPHY_CARD_MODE.LIST
    }
  },
  computed: {
    _biographyLink () {
      return '/biographies/' + this.id + '#comments'
    }
  },
  methods: {
    gotoComments () {
      if (this.mode === BIOGRAPHY_CARD_MODE.READ) {
        this.$vuetify.goTo('#comments', {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      } else {
        this.$router.push(this._biographyLink)
      }
    }
  }
}
</script>

<style scoped>

</style>
