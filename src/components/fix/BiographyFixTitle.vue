<template>
  <v-card-text>
    <div>
      <div v-if="fixerBiography">
        <span>
          Исполнитель:
          <a :href="_fixerBiographyLink">{{ _fixerFio }}</a>
        </span>
      </div>
      <div>
        Статус:
        <strong>{{ _fixStatus }}</strong>
      </div>
      <div>
        <span>
          Предложил:
          <a :href="_creatorBiographyLink">{{ _creatorFio }}</a>
        </span>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import { FIX_STATUS } from '../../config'

export default {
  name: 'BiographyFixTitle',
  props: {
    status: {
      type: Number
    },
    fixerBiography: {
      type: Object
    },
    creatorBiography: {
      type: Object
    }
  },
  computed: {
    _fixStatus () {
      switch (this.status) {
        case FIX_STATUS.PENDING:
          return 'В обработке'
        case FIX_STATUS.CLOSED:
          return 'Закрыто'
      }

      return null
    },
    _fixerFio () {
      return this.fixerBiography.lastName + ' ' + this.fixerBiography.firstName
    },
    _creatorFio () {
      return this.creatorBiography.lastName + ' ' + this.creatorBiography.firstName
    },
    _fixerBiographyLink () {
      return '/biography/' + this.fixerBiography.id
    },
    _creatorBiographyLink () {
      return '/biography/' + this.creatorBiography.id
    }
  }
}
</script>

<style scoped>

</style>
