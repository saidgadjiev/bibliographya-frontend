<template>
  <v-dialog v-model="_visible"
            width="500"
            :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <v-card>
      <v-card-text class="pb-0">
        <v-form>
          <v-textarea
            v-validate="'required'"
            :error-messages="errors.collect('value')"
            name="value"
            type="text"
            :label="placeholder"
            v-model="form.value"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="doOk" color="green darken-2" class="white--text">{{ okCaption }}</v-btn>
        <v-btn @click="cancel" class="primary">Отменить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'TextareaDialog',
  data () {
    return {
      form: {
        value: ''
      }
    }
  },
  props: {
    visible: Boolean,
    placeholder: String,
    okCaption: String,
    ok: Function,
    requiredText: String
  },
  methods: {
    resetForm () {
      this.form.value = ''
      this.$validator.reset()
    },
    doOk () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          that.ok(that.form.value)
          that.resetForm()
          that.loading = true
        }
      })
    },
    cancel () {
      this.$emit('update:visible', false)
    }
  },
  created () {
    let that = this

    this.$validator.localize('ru', {
      custom: {
        value: {
          required: () => that.requiredText
        }
      }
    })
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
        this.resetForm()
      }
    }
  }
}
</script>

<style scoped>

</style>
