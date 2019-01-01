<template>
  <v-dialog
    v-model="_visible"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ _reasonStatus }}
      </v-card-title>
      <v-card-text>
        <span>
          Количество жалоб:
          <strong>{{ complaint.count }}</strong>
        </span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { REPORT_REASON } from '../../config'

export default {
  name: 'ComplaintInfoDialog',
  props: {
    visible: {
      type: Boolean
    },
    complaint: {
      type: Object
    }
  },
  computed: {
    _reasonStatus () {
      switch (this.complaint.reason) {
        case REPORT_REASON.SPAM:
          return 'Спам'
        case REPORT_REASON.CLONE:
          return 'Клон'
        case REPORT_REASON.ANOTHER:
          return 'Другая'
      }
    },
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
