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
import biographyFixService from '../../../services/biography-fix-service'

export default {
  name: 'FixButton',
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
    status: {
      type: Number
    }
  },
  methods: {
    complete () {
      let that = this
      that.loading = true

      biographyFixService.complete(this.id, {
        signal: this.action.signal,
        status: this.status
      })
        .then(
          response => {
            that.$emit('update:status', response.data.status)
            that.$emit('update:actions', response.data.actions)
            that.$emit('update:fixerId', response.data.fixerId)
            that.$emit('update:fixer', response.data.fixer)
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
