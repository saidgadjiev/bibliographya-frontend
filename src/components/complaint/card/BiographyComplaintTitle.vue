<template>
  <v-card-text>
    <complaint-info-dialog
      :visible.sync="showComplaintInfoDialog"
      :complaint="complaint"
    ></complaint-info-dialog>
    <v-list dense>
      <v-subheader class="pa-0">
        Новые жалобы: <strong>{{ newComplaintsCount }}</strong>
      </v-subheader>
      <v-list-tile
        @click="openComplaintInfo(0)"
      >
        <v-list-tile-content>
        <span>Спам:
        <strong>{{ _spamCount }}</strong>
          </span>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile
        @click="openComplaintInfo(1)"
      >
        <v-list-tile-content>
      <span>
        Клон:
        <strong>{{ _cloneCount }}</strong>
      </span>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile
        class="pa-0"
      >
        <v-list-tile-content>
      <span>
        Другие:
        <strong>{{ _anotherCount }}</strong>
      </span>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click="openComplaintInfo(2)" v-if="_anotherCount > 0">
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card-text>
</template>

<script>
import { REPORT_REASON } from '../../../config'
import ComplaintInfoDialog from '../dialog/ComplaintInfoDialog.vue'

export default {
  name: 'BiographyComplaintTitle',
  data () {
    return {
      showComplaintInfoDialog: false,
      complaint: {}
    }
  },
  props: {
    newComplaintsCount: {
      type: Number,
      default: 0
    },
    newComplaints: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    _spamCount () {
      return this.newComplaints[REPORT_REASON.SPAM].count
    },
    _cloneCount () {
      return this.newComplaints[REPORT_REASON.CLONE].count
    },
    _anotherCount () {
      return this.newComplaints[REPORT_REASON.ANOTHER] ? this.newComplaints[REPORT_REASON.ANOTHER].count : 0
    }
  },
  methods: {
    openComplaintInfo (reason) {
      this.showComplaintInfoDialog = true
      this.complaint = this.newComplaints[reason]
    },
    empty () {

    },
    contextmenu (e, reason) {
      console.log('Context menu ' + reason)
    }
  },
  components: {
    ComplaintInfoDialog
  }
}
</script>

<style scoped>

</style>
