<template>
  <v-card>
    <v-card-text class="text-xs-center">
      <span class="font-weight-bold">
        Произошла ошибка
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="error" @click="trigger">
        Попробовать еще раз
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ErrorCard',
  props: {
    trigger: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
