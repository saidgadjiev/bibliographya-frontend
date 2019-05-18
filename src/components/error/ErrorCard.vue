<template>
  <v-card>
    <v-card-text class="text-xs-center">
      <span v-if="isOnline" class="font-weight-bold">
        Произошла ошибка
      </span>
      <span v-else class="font-weight-bold">
        Отсутствует подключение к Интернету
      </span>
    </v-card-text>
    <v-card-actions style="justify-content: center">
      <v-btn color="error" @click="trigger">
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
