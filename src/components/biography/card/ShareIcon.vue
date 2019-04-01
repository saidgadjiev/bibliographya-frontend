<template>
  <v-speed-dial
    class="ml-4"
    v-model="shares"
    :direction="direction"
    open-on-hover
    :transition="transition"
  >
    <template #activator>
      <v-btn icon flat color="blue darken-1" @click="shares = !shares">
        <v-icon color="blue darken-1">mdi-share-outline</v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="primary"
    >
      <v-icon dark>fab fa-vk</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'ShareIcon',
  data: () => ({
    direction: 'top',
    shares: false,
    transition: 'slide-y-reverse-transition'
  })
}
</script>

<style scoped>

</style>
