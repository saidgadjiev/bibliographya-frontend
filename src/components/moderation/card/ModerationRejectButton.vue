<template>
  <v-form>
    <v-textarea
      v-validate="'required'"
      :error-messages="errors.collect('rejectText')"
      name="rejectText"
      type="text"
      class="mt-0 pt-0"
      placeholder="Причина отклонения"
      v-model="rejectText"
    ></v-textarea>
    <v-btn block class="primary mt-1" @click="reject">{{ action.caption }}</v-btn>
  </v-form>
</template>

<script>
import biographyModerationService from '../../../services/biography-moderation-service'

export default {
  name: 'ModerationRejectButton',
  data () {
    return {
      rejectText: ''
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
  created () {
    this.$validator.localize('ru', {
      custom: {
        rejectText: {
          required: () => 'Введите причину отклонения'
        }
      }
    })
  },
  methods: {
    reject () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          biographyModerationService.complete(this.id, {
            signal: this.action.signal,
            status: this.moderationStatus,
            rejectText: this.rejectText
          })
            .then(
              response => {
                that.$emit('update:moderationInfo', response.data.moderationInfo)
                that.$emit('update:moderationStatus', response.data.moderationStatus)
                that.$emit('update:actions', response.data.actions)
              }
            )
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
