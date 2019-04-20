<template>
  <div class="ml-4 d-flex align-center">
    <v-icon style="font-size: 14px" color="blue darken-1">fas fa-eye</v-icon>
    <span style="font-size: 14px;color: #007bff" class="pl-1">{{ viewsCount }}</span>
  </div>
</template>

<script>
export default {
  name: 'ViewsCountIcon',
  inheritAttrs: false,
  props: {
    viewsCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
