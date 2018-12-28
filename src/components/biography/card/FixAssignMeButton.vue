<template>
  <v-btn
    block
    @click="assignMe"
    color="primary"
  >{{ action.caption }}</v-btn>
</template>

<script>
import biographyFixService from '../../../services/biography-fix-service'

export default {
  name: 'FixAssignMeButton',
  props: {
    id: {
      type: Number
    },
    fixerBiography: {
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
      this.$emit('update:fixerBiography', info.fixerBiography)
      this.$emit('update:fixerId', info.fixerBiography.userId)
    },
    assignMe () {
      let that = this

      biographyFixService.assignMe(this.id, {
        signal: this.action.signal,
        status: this.status
      })
        .then(
          response => {
            that.updateFixerInfo(response.data)
          },
          e => {
            if (e.response.status === 409) {
              that.updateFixerInfo(e.response.data)

              let currentFixer = that.fixerBiography
              let message = '<a href="\'#/biography/' + currentFixer.id + '">' +
                currentFixer.firstName + ' ' + currentFixer.lastName + '</a>,&nbsp;уже взял исправление на себя.'

              that.$store.dispatch('alert/error', message)
            }
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
