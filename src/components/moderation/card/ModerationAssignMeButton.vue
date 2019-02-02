<template>
  <v-btn
    block
    @click="assignMe"
    color="primary"
    :loading="loading"
    :disabled="loading"
  >{{ action.caption }}</v-btn>
</template>

<script>
import biographyModerationService from '../../../services/biography-moderation-service'

export default {
  name: 'ModerationAssignMeButton',
  data () {
    return {
      loading: false
    }
  },
  props: {
    id: {
      type: Number
    },
    moderator: {
      type: Object
    },
    moderationStatus: {
      type: Number
    },
    action: {
      type: Object
    }
  },
  methods: {
    updateModeratorInfo (info) {
      this.$emit('update:moderator', info.moderator)
      this.$emit('update:moderatorId', info.moderator.userId)
      this.$emit('update:actions', info.actions)
    },
    assignMe () {
      let that = this
      that.loading = true

      biographyModerationService.assignMe(this.id, {
        signal: this.action.signal,
        status: this.moderationStatus
      })
        .then(
          response => {
            that.updateModeratorInfo(response.data)
            that.loading = false
          },
          e => {
            if (e.response.status === 409) {
              that.updateModeratorInfo(e.response.data)

              let currentModerator = that.moderator
              let message = '<a href="\'/biography/' + currentModerator.id + '">' +
                currentModerator.firstName + ' ' + currentModerator.lastName + '</a>,&nbsp;уже взял биографию на модерацию.'

              that.$swal.fire({
                html: message,
                type: 'error',
                showCloseButton: true
              })
            }
            that.loading = false
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
