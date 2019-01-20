<template>
  <v-dialog
    v-model="visible"
    width="500"
  >
    <v-card>
      <v-card-text>
        <p v-html="message"></p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="clear"
        >
          Ок
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AlertDialog',
  props: {
    types: {
      type: Array,
      default: function () {
        return ['alert-success', 'alert-danger']
      }
    }
  },
  computed: {
    ...mapGetters('alert', [
      'type', 'message'
    ]),
    visible: {
      get () {
        return this.type !== null && this.types.indexOf(this.type) !== -1
      },
      set (val) {
        this.clear()
      }
    }
  },
  methods: {
    ...mapActions('alert', [
      'clear'
    ])
  }
}
</script>

<style scoped>

</style>
