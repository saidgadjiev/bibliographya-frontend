<template>
  <div>
    <div v-if="_showModerator">
    <span>
      Исполнитель:&nbsp;
      <router-link class="bib-a word-break-word" :to="_accountLink">{{ _moderatorName }}</router-link>
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
    _accountLink () {
      if (this.moderator) {
        return '/profile/' + this.moderator.userId
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
