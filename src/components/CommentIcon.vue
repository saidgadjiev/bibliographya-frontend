<template>
  <a :href="biographyLink" class="ml-2" style="text-decoration: none">
    <v-icon color="blue darken-1">mdi-comment-outline</v-icon>
    <span style="font-size: 18px">{{ commentsCount }}</span>
  </a>
</template>

<script>
export default {
  name: 'CommentIcon',
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
    biographyLink () {
      return '#/biography/' + this.id + '#comments'
    }
  }
}
</script>

<style scoped>

</style>
