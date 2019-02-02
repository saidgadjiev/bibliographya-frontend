<template>
  <v-card-text>
    <div>
      <div v-if="_showModerator">
    <span>
      Исполнитель:&nbsp;
      <router-link class="bibliographya-a word-break" :to="_biographyLink">{{ _moderatorName }}</router-link>
    </span>
      </div>
      <div>
    <span>
      Статус:&nbsp;
      <strong>{{ _moderationStatus }}</strong>
    </span>
      </div>
      <div v-if="moderationInfo">
        <span style="color: red" class="font-weight-bold">Причина отклонения:</span>
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
    moderator: {
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
      return this.moderator && this.showModerator
    },
    _moderatorName () {
      return this.moderator.lastName + ' ' + this.moderator.firstName
    },
    _biographyLink () {
      if (this.moderator) {
        return '/biography/' + this.moderator.id
      }

      return ''
    },
    _moderationStatus () {
      let status = this.moderationStatus

      if (status !== undefined) {
        switch (status) {
          case MODERATION_STATUS.PENDING:
            return 'В обработке'
          case MODERATION_STATUS.APPROVED:
            return 'Одобрено'
          case MODERATION_STATUS.REJECTED:
            return 'Отклонено'
        }
      }

      return ''
    }
  }
}

</script>

<style scoped>

</style>
