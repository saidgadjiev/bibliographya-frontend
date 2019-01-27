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
    <v-btn block class="primary mt-1" @click="ignore">{{ action.caption }}</v-btn>
  </v-form>
</template>

<script>
import biographyFixService from '../../../services/biography-fix-service'

export default {
  name: 'FixIgnoreButton',
  data () {
    return {
      infoText: ''
    }
  },
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
  created () {
    this.$validator.localize('ru', {
      custom: {
        rejectText: {
          required: () => 'Введите причину игнора'
        }
      }
    })
  },
  methods: {
    ignore () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          biographyFixService.assignMe(this.id, {
            signal: this.action.signal,
            status: this.status,
            info: this.infoText
          })
            .then(
              response => {
                that.$emit('update:actions', response.data.actions)
                that.$emit('update:info', response.data.info)
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
