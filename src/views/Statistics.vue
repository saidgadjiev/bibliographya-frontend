<template>
    <v-card v-if="statistics">
      <v-card-title>
        Статистика
      </v-card-title>
      <v-card-text>
        Пользователей: {{ statistics.count }}
        <div v-for="(providerId, count) in statistics.usersByProvider" :key="providerId">
          {{ providerName(providerId) }} : {{ count }}
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
import { PROVIDERS } from '../config'

export default {
  name: 'Statistics',
  props: {
    statistics: {
      type: Object
    }
  },
  methods: {
    providerName (providerId) {
      return PROVIDERS[providerId]
    }
  }
}
</script>

<style scoped>

</style>
