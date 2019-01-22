import EventBus from '../../eventbus/eventbus'
import {PLUGIN_EVENTS} from '../../config'

export const AlertPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('alert/')) {
      EventBus.$emit(PLUGIN_EVENTS.ALERT, {
        type: mutation.type
      })
    }
  })
}
