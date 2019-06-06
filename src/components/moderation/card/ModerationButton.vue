<template>
  <div>
    <v-btn
      block
      @click="doAction"
      color="primary"
      :loading="loading"
      :disabled="loading"
    >{{ action.caption }}
    </v-btn>
    <textarea-dialog
      :ok="okFunction"
      placeholder="Причина отклонения"
      :visible.sync="dialogVisible"
      ok-caption="Ок"
      required-text="Введите причину отклонения"
    >
    </textarea-dialog>
  </div>
</template>

<script>
import biographyModerationService from '../../../services/biography-moderation-service'
import { MODERATION_BUTTON } from '../../../config'
import TextareaDialog from '../../dialog/TextareaDialog'

export default {
  name: 'ModerationButton',
  components: { TextareaDialog },
  data () {
    return {
      okFunction: () => {
      },
      dialogVisible: false,
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
    moderator: {
      type: Object
    },
    moderationStatus: {
      type: Number
    }
  },
  methods: {
    doAction () {
      switch (this.action.name) {
        case MODERATION_BUTTON.ASSIGN_ME:
          this.assignMe()
          break
        case MODERATION_BUTTON.REJECT:
          this.okFunction = this.reject
          this.dialogVisible = true
          break
        case MODERATION_BUTTON.USER_PENDING:
          this.userComplete()
          break
        default:
          this.complete()
          break
      }
    },
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
              let message = '<a href="\'/profile/' + currentModerator.userId + '">' +
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
    },
    reject (rejectText) {
      let that = this
      that.dialogVisible = false
      that.loading = true

      biographyModerationService.complete(this.id, {
        signal: this.action.signal,
        status: this.moderationStatus,
        info: rejectText
      })
        .then(
          response => {
            that.$emit('update:moderationInfo', response.data.moderationInfo)
            that.$emit('update:moderationStatus', response.data.moderationStatus)
            that.$emit('update:actions', response.data.actions)
          }
        ).finally(() => {
          that.loading = false
        })
    },
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
    },
    userComplete () {
      let that = this

      that.loading = true
      biographyModerationService.userComplete(this.id, {
        signal: this.action.signal,
        status: this.moderationStatus
      })
        .then(
          response => {
            that.$emit('update:moderationStatus', response.data.moderationStatus)
            that.$emit('update:actions', response.data.actions)
          }
        ).finally(() => {
          that.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
