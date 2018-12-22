<template>
    <v-dialog
      v-model="_visible"
      width="500"
    >
      <v-card>
        <v-card-text>
          <v-form>
            <v-textarea
              v-validate="'required'"
              :error-messages="errors.collect('fixText')"
              name="fixText"
              type="text"
              class="mt-0 pt-0"
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
            >
            Предложить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import biographyFixService from '../../services/biography-fix-service'

export default {
  name: 'CreateFixSuggestDialog',
  data () {
    return {
      fixText: ''
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

      this.$validator.validateAll().then(result => {
        if (result) {
          biographyFixService.suggest(this.biographyId, this.fixText)
            .then(
              () => {
                that.$emit('update:visible', false)
              }
            )
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
