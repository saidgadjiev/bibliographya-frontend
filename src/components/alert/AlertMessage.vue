<template>
  <div id="alert">
    <v-alert
      v-model="_alert"
      dismissible
      :type="_alertType"
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
        offset: 10,
        easing: 'easeInOutCubic'
      }
    }
  },
  computed: {
    _alert: {
      get () {
        return this.types.indexOf(this.alertType) !== -1
      },
      set (val) {
        this.clearAlert()
      }
    },
    _alertType () {
      if (this.alertType === 'alert-success') {
        return 'success'
      }

      return 'error'
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

      if (that.types.indexOf(that.alertType) !== -1) {
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
