<template>
  <v-form>
    <v-textarea
      v-validate="'required'"
      :error-messages="errors.collect('infoText')"
      name="infoText"
      type="text"
      class="mt-0 pt-0"
      placeholder="Комментарий"
      v-model="infoText"
    ></v-textarea>
    <v-btn
      block
      class="primary mt-1"
      @click="ignore"
      :loading="loading"
      :disabled="loading"
    >{{ action.caption }}</v-btn>
  </v-form>
</template>

<script>
import bugTrackingService from '../../../../services/bug-tracking-service'

export default {
  name: 'BugActionIgnore',
  inheritAttrs: false,
  data () {
    return {
      infoText: '',
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
  created () {
    this.$validator.localize('ru', {
      custom: {
        infoText: {
          required: () => 'Введите комментарий'
        }
      }
    })
  },
  methods: {
    ignore () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          that.loading = true

          bugTrackingService.complete(this.id, {
            signal: this.action.signal,
            status: this.status,
            info: this.infoText
          })
            .then(
              response => {
                that.$emit('update:actions', response.data.actions)
                that.$emit('update:info', response.data.info)
                that.loading = false
              },
              e => {
                that.loading = false
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
