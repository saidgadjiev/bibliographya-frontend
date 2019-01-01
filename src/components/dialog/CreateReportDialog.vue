<template>
  <v-dialog
    v-model="_visible"
    width="500"
  >
    <v-card>
      <v-card-text>
        <v-list>
          <v-list-tile
            @click="create(0)"
          >
            <v-list-tile-title>Спам</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            @click="create(1)"
          >
            <v-list-tile-title>Ложный автор</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            @click="anotherReason = true"
          >
            <v-list-tile-title>Другая причина</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-form v-if="anotherReason">
          <v-textarea
            v-validate="'required'"
            :error-messages="errors.collect('reasonText')"
            name="reasonText"
            type="text"
            class="mt-0 pt-0"
            placeholder="Причина жалобы"
            v-model="reasonText"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions v-if="anotherReason">
        <v-btn
          block
          class="primary mt-1"
          @click="create(2)"
        >
          Пожаловаться
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import biographyReportService from '../../services/biography-report-service'
import { REPORT_REASON } from '../../config'

export default {
  name: 'CreateReportDialog',
  data () {
    return {
      anotherReason: false,
      reasonText: undefined
    }
  },
  props: {
    biographyId: {
      type: Number
    }
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        reasonText: {
          required: () => 'Введите причину жалобы'
        }
      }
    })
  },
  methods: {
    create (reason) {
      if (reason === REPORT_REASON.ANOTHER) {
        let that = this

        this.$validator.validateAll().then(result => {
          if (result) {
            biographyReportService.createReport(this.biographyId, {
              reason: REPORT_REASON.ANOTHER,
              reasonText: that.reasonText
            })
              .then(
                () => {
                  that.reasonText = undefined
                  that.$emit('update:visible', false)
                }
              )
          }
        })
      } else {
        biographyReportService.createReport(this.biographyId, {
          reason: reason
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
