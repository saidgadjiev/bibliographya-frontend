<template>
  <v-btn
    block
    @click="assignMe"
    color="primary"
    :loading="loading"
    :disabled="loading"
  >{{ action.caption }}
  </v-btn>
</template>

<script>
import bugTrackingService from '../../../../services/bug-tracking-service'

export default {
  name: 'BugActionAssignMe',
  inheritAttrs: false,
  data () {
    return {
      loading: false
    }
  },
  props: {
    id: {
      type: Number
    },
    fixer: {
      type: Object
    },
    action: {
      type: Object
    },
    status: {
      type: Number
    }
  },
  methods: {
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
                  currentFixer.firstName + ' ' + currentFixer.lastName + '</a>,&nbsp;уже взял багу на себя.'

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
