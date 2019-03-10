<template>
  <v-progress-circular
    :size="size"
    color="primary"
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
    }
  }
}
</script>

<style scoped>

</style>
