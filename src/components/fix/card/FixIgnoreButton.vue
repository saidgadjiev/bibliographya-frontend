<template>
  <v-form>
    <v-textarea
      v-validate="'required'"
      :error-messages="errors.collect('infoText')"
      name="infoText"
      type="text"
      class="mt-0 pt-0"
      placeholder="Причина игнора"
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
import biographyFixService from '../../../services/biography-fix-service'

export default {
  name: 'FixIgnoreButton',
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
          required: () => 'Введите причину игнора'
        }
      }
    })
  },
  methods: {
    ignore () {
      let that = this
      that.loading = true

      this.$validator.validateAll().then(result => {
        if (result) {
          biographyFixService.complete(this.id, {
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
        } else {
          that.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
