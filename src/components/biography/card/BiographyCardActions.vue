<template>
  <div>
      <like
        @like-toggled="onLikeToggled"
        :biography="biographyObject" class="ml-1"></like>
      <a :href="'#/biography/' + biographyObject.id + '#comments'" class="ml-2" style="text-decoration: none">
        <v-icon color="blue darken-1">mdi-comment-outline</v-icon>
        <span style="font-size: 18px">{{ biographyObject.commentsCount }}</span>
      </a>
      <v-spacer></v-spacer>
      <v-icon color="blue darken-1" style="font-size:14px">fas fa-eye</v-icon>
      <span class="ml-1">0</span>
  </div>
</template>

<script>
export default {
  name: 'BiographyCardActions',
  props: {
    biographyObject: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
