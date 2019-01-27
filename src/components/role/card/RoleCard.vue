<template>
    <v-card>
      <v-card-text>
        {{ name }}
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'RoleCard',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
