<template>
  <v-btn
    block
    @click="complete"
    color="primary"
    :loading="loading"
    :disabled="loading"
  >{{ action.caption }}</v-btn>
</template>

<script>
import biographyModerationService from '../../../services/biography-moderation-service'

export default {
  name: 'ModerationButton',
  data () {
    return {
      loading: false
    }
  },
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
      that.loading = true

      biographyModerationService.complete(this.id, {
        signal: this.action.signal,
        status: this.moderationStatus
      })
        .then(
          response => {
            that.$emit('update:moderationStatus', response.data.moderationStatus)
            that.$emit('update:actions', response.data.actions)
            that.$emit('update:moderatorId', response.data.moderatorId)
            that.$emit('update:moderator', response.data.moderator)
            that.$emit('update:moderationInfo', response.data.moderationInfo)
            that.loading = false
          },
          e => {
            that.loading = false
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
