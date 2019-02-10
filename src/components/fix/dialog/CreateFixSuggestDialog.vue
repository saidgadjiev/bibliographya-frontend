<template>
    <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      v-model="_visible"
      width="500"
    >
      <v-card>
        <v-card-text class="pb-0">
          <v-form>
            <v-textarea
              v-validate="'required'"
              :error-messages="errors.collect('fixText')"
              name="fixText"
              type="text"
              placeholder="Что вы предлагаете исправить?"
              v-model="fixText"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            class="primary mt-1"
            @click="save"
            :loading="loading"
            :disabled="loading"
            >
            Предложить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import biographyFixService from '../../../services/biography-fix-service'

export default {
  name: 'CreateFixSuggestDialog',
  data () {
    return {
      fixText: '',
      loading: false
    }
  },
  props: {
    biographyId: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
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
        fixText: {
          required: () => 'Введите исправление'
        }
      }
    })
  },
  methods: {
    save () {
      let that = this
      that.loading = true

      this.$validator.validateAll().then(result => {
        if (result) {
          biographyFixService.suggest(this.biographyId, this.fixText)
            .then(
              () => {
                that.fixText = undefined
                that.$emit('update:visible', false)
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
  },
  watch: {
    visible () {
      this.fixText = ''
    }
  }
}
</script>

<style scoped>

</style>
