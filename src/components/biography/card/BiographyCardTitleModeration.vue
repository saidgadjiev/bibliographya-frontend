<template>
  <v-card-text>
    <div>
      <div v-if="_showModerator">
    <span>
      Исполнитель:&nbsp;
      <router-link class="bibliographya-a" :to="_biographyLink">{{ _moderatorFullName }}</router-link>
    </span>
      </div>
      <div>
    <span>
      Статус:&nbsp;
      <strong>{{ _moderationStatus }}</strong>
    </span>
      </div>
      <div v-if="moderationInfo">
        <span style="color: red">Причина отклонения:</span>
        {{ moderationInfo }}
      </div>
    </div>
  </v-card-text>
</template>

<script>
import { MODERATION_STATUS } from '../../../config'

export default {
  name: 'BiographyCardTitleModeration',
  inheritAttrs: false,
  props: {
    showModerator: {
      type: Boolean,
      default: false
    },
    moderatorBiography: {
      type: Object
    },
    moderationStatus: {
      type: Number
    },
    moderationInfo: {
      type: String
    }
  },
  computed: {
    _showModerator () {
      return this.moderatorBiography && this.showModerator
    },
    _moderatorFullName () {
      return this.moderatorBiography.lastName + ' ' + this.moderatorBiography.firstName
    },
    _biographyLink () {
      if (this.moderatorBiography) {
        return '/biography/' + this.moderatorBiography.id
      }

      return '#'
    },
    _moderationStatus () {
      let status = this.moderationStatus

      if (status !== undefined) {
        switch (status) {
          case MODERATION_STATUS.PENDING:
            return 'На модерации'
          case MODERATION_STATUS.APPROVED:
            return 'Одобрено'
          case MODERATION_STATUS.REJECTED:
            return 'Отклонено'
        }
      }
    }
  }
}

</script>

<style scoped>

</style>
