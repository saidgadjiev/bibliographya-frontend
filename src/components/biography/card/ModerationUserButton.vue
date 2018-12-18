<template>
  <v-btn
    block
    @click="complete"
    color="primary"
  >{{ action.caption }}</v-btn>
</template>

<script>
import biographyModerationService from '../../../services/biography-moderation-service'

export default {
  name: 'ModerationButton',
  props: {
    id: {
      type: Number
    },
    action: {
      type: Object,
      required: true
    },
    moderationStatus: {
      type: Number
    }
  },
  methods: {
    complete () {
      let that = this

      biographyModerationService.userComplete(this.id, {
        signal: this.action.signal,
        status: this.moderationStatus
      })
        .then(
          response => {
            that.$emit('update:moderationStatus', response.data.moderationStatus)
            that.$emit('update:actions', response.data.actions)
            that.$emit('update:moderatorName', response.data.moderatorName)
            that.$emit('update:moderatorBiography', response.data.moderatorBiography)
            that.$emit('update:moderationInfo', response.data.moderationInfo)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
