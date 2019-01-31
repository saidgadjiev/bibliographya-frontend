<template>
  <div class="ml-2 d-flex align-center">
    <v-icon color="blue darken-1" @click="gotoComments">mdi-comment-outline</v-icon>
    <span style="font-size: 18px;color: #007bff" class="pl-1">{{ commentsCount }}</span>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    _biographyLink () {
      return '/biography/' + this.id + '#comments'
    }
  },
  methods: {
    gotoComments () {
      this.$router.push(this._biographyLink)
    }
  }
}
</script>

<style scoped>

</style>
