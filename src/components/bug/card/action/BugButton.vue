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
      placeholder="Комментарий"
      :visible.sync="dialogVisible"
      ok-caption="Ок"
      required-text="Введите комментарий"
    ></textarea-dialog>
  </div>
</template>

<script>
import bugTrackingService from '../../../../services/bug-tracking-service'
import TextareaDialog from '../../../dialog/TextareaDialog'
import { BUG_BUTTONS } from '../../../../config'

export default {
  name: 'BugButton',
  components: { TextareaDialog },
  inheritAttrs: false,
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
    status: {
      type: Number
    }
  },
  methods: {
    doAction () {
      switch (this.action.name) {
        case BUG_BUTTONS.ASSIGN_ME:
          this.assignMe()
          break
        case BUG_BUTTONS.IGNORE:
          this.okFunction = this.ignore
          this.dialogVisible = true
          break
        default:
          this.complete()
          break
      }
    },
    updateFixerInfo (info) {
      this.$emit('update:actions', info.actions)
      this.$emit('update:fixer', info.fixer)
      this.$emit('update:fixerId', info.fixer.userId)
    },
    assignMe () {
      let that = this
      that.loading = true

      bugTrackingService.assignMe(this.id, {
        signal: this.action.signal,
        status: this.status
      })
        .then(
          response => {
            that.updateFixerInfo(response.data)
            that.loading = false
          },
          e => {
            if (e.response.status === 409) {
              that.updateFixerInfo(e.response.data)

              let currentFixer = that.fixer
              let message = '<a href="\'/biographies/' + currentFixer.id + '">' +
                currentFixer.firstName + ' ' + currentFixer.lastName + '</a>,&nbsp;уже взял исправление на себя.'

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
    ignore (ignoreText) {
      let that = this
      that.dialogVisible = false
      that.loading = true

      bugTrackingService.complete(this.id, {
        signal: this.action.signal,
        status: this.status,
        info: ignoreText
      })
        .then(
          response => {
            that.$emit('update:actions', response.data.actions)
            that.$emit('update:info', response.data.info)
            that.$emit('update:status', response.data.status)
          }
        ).finally(() => {
          that.loading = false
        })
    },
    complete () {
      let that = this
      that.loading = true

      bugTrackingService.complete(this.id, {
        signal: this.action.signal,
        status: this.status
      })
        .then(
          response => {
            that.$emit('update:status', response.data.status)
            that.$emit('update:actions', response.data.actions)
            that.$emit('update:fixerId', response.data.fixerId)
            that.$emit('update:fixer', response.data.fixer)
            that.$emit('update:info', response.data.info)
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
