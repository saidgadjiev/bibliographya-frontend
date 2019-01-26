<template>
  <v-btn
    block
    @click="assignMe"
    color="primary"
  >{{ action.caption }}</v-btn>
</template>

<script>
import biographyModerationService from '../../../services/biography-moderation-service'

export default {
  name: 'ModerationApproveButton',
  props: {
    id: {
      type: Number
    },
    moderatorBiography: {
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
      this.$emit('update:moderatorBiography', info.moderatorBiography)
      this.$emit('update:moderatorId', info.moderatorBiography.userId)
      this.$emit('update:actions', info.actions)
    },
    assignMe () {
      let that = this

      biographyModerationService.assignMe(this.id, {
        signal: this.action.signal,
        status: this.moderationStatus
      })
        .then(
          response => {
            that.updateModeratorInfo(response.data)
          },
          e => {
            if (e.response.status === 409) {
              that.updateModeratorInfo(e.response.data)

              let currentModerator = that.moderatorBiography
              let message = '<a href="\'/biography/' + currentModerator.id + '">' +
                currentModerator.firstName + ' ' + currentModerator.lastName + '</a>,&nbsp;уже взял биографию на модерацию.'

              that.$swal.fire({
                html: message,
                type: 'error',
                showCloseButton: true
              })
            }
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
