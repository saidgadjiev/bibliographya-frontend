<template>
  <v-progress-circular
    :size="size"
    :width="width"
    :color="color"
    indeterminate
  ></v-progress-circular>
</template>

<script>
export default {
  name: 'ProgressCircular',
  props: {
    size: {
      type: Number,
      default: 50
    },
    width: {
      type: Number,
      default: 4
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped>

</style>
