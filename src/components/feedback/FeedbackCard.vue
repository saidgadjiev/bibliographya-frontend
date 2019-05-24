<template>
  <v-card>
    <v-card-text class="text-xs-center">
      <span>{{content}}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'FeedbackCard',
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
