<template>
  <v-card-text>
    <div>
      <div v-if="fixer">
        <span>
          Исполнитель:
          <router-link class="bib-a" :to="_fixerBiographyLink">{{ _fixerFio }}</router-link>
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
      <div>
        <span>
          Предложил:
          <router-link class="bib-a" :to="_creatorBiographyLink">{{ _creatorFio }}</router-link>
        </span>
      </div>
      <div v-if="fixText">
        <span style="color: red;" class="subheading font-weight-bold">
          Исправление:
        </span>
        {{ fixText }}
      </div>
    </div>
  </v-card-text>
</template>

<script>
import { FIX_STATUS } from '../../../config'

export default {
  name: 'BiographyFixTitle',
  props: {
    status: {
      type: Number
    },
    fixer: {
      type: Object
    },
    creator: {
      type: Object
    },
    fixText: {
      type: String
    },
    info: {
      type: String
    }
  },
  computed: {
    _fixStatus () {
      switch (this.status) {
        case FIX_STATUS.IGNORED:
          return 'Закрыто без исправления'
        case FIX_STATUS.PENDING:
          return 'В обработке'
        case FIX_STATUS.CLOSED:
          return 'Закрыто'
      }

      return null
    },
    _fixerFio () {
      return this.fixer.lastName + ' ' + this.fixer.firstName
    },
    _creatorFio () {
      return this.creator.lastName + ' ' + this.creator.firstName
    },
    _fixerBiographyLink () {
      return '/biographies/' + this.fixer.id
    },
    _creatorBiographyLink () {
      return '/biographies/' + this.creator.id
    }
  }
}
</script>

<style scoped>

</style>
