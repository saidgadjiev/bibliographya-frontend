<template>
  <div id="alert">
    <v-alert
      v-if="alertType === 'alert-success'"
      :value="true"
      @input="clear"
      dismissible
      type="success"
      color="light-green darken-2"
      id="alert-success"
    >
      {{ alertMessage }}
    </v-alert>
    <v-alert
      v-if="alertType === 'alert-danger'"
      :value="true"
      @input="clear"
      dismissible
      type="error"
      id="alert-error"
    >
      {{ alertMessage }}
    </v-alert>
  </div>
</template>

<script>
import EventBus from '../../eventbus/eventbus'
import { PLUGIN_EVENTS } from '../../config'
import alert from '../../mixins/alert'

export default {
  name: 'AlertMessage',
  mixins: [alert],
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
  methods: {
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
