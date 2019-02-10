<template>
  <v-card-text>
    <div>
      <div v-if="fixer">
        <span>
          Исполнитель:
          <router-link class="bibliographya-a" :to="_fixerBiographyLink">{{ _fixerFio }}</router-link>
        </span>
      </div>
      <div>
        Статус:
        <strong>{{ _fixStatus }}</strong>
      </div>
      <div v-if="info">
        Комментарий:
        <strong>{{ info }}</strong>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import { BUG_STATUS } from '../../../config'

export default {
  name: 'BugFixTitle',
  props: {
    status: {
      type: Number
    },
    fixer: {
      type: Object
    },
    info: {
      type: String
    }
  },
  computed: {
    _fixStatus () {
      switch (this.status) {
        case BUG_STATUS.PENDING:
          return 'В обработке'
        case BUG_STATUS.CLOSED:
          return 'Закрыто'
        case BUG_STATUS.IGNORED:
          return 'Закрыто без исправления'
      }

      return null
    },
    _fixerFio () {
      return this.fixer.lastName + ' ' + this.fixer.firstName
    },
    _fixerBiographyLink () {
      return '/biographies/' + this.fixer.id
    }
  }
}
</script>

<style scoped>

</style>
