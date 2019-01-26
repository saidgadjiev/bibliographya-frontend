<template>
  <div id="alert">
    <v-alert
      v-if="type === 'alert-success'"
      :value="true"
      @input="clear"
      dismissible
      type="success"
      color="light-green darken-2"
      id="alert-success"
    >
      {{ message }}
    </v-alert>
    <v-alert
      v-if="type === 'alert-danger'"
      :value="true"
      @input="clear"
      dismissible
      type="error"
      id="alert-error"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from '../../eventbus/eventbus'
import { PLUGIN_EVENTS } from '../../config'

export default {
  name: 'AlertMessage',
  data () {
    return {
      options: {
        duration: 300,
        offset: -61,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: {
    types: {
      type: Array,
      default: function () {
        return ['alert-success', 'alert-danger']
      }
    }
  },
  mounted () {
    EventBus.$on(PLUGIN_EVENTS.ALERT, this.alert)
  },
  beforeDestroy () {
    EventBus.$off(PLUGIN_EVENTS.ALERT)
  },
  computed: {
    ...mapGetters('alert', [
      'type', 'message'
    ])
  },
  methods: {
    ...mapActions('alert', [
      'clear'
    ]),
    alert () {
      let that = this

      if (that.types.indexOf(that.type) !== -1) {
        that.$nextTick(function () {
          that.$vuetify.goTo('#alert', that.options)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
