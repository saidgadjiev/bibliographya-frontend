<template>
  <vue-pull-to
    :root="root"
    :top-load-method="pullToRefreshMethod"
    :bottom-load-method="pullToLoadMoreMethod"
  >
    <template #top-block>
      <div class="text-xs-center">
      <progress-circular :size="32"/>
      </div>
    </template>
    <slot></slot>
    <template #bottom-block>
      <div class="text-xs-center pt-3">
      <progress-circular :size="32"/>
      </div>
    </template>
  </vue-pull-to>
</template>

<script>
import VuePullTo from '../../components/pullTo/VuePullTo'
import ProgressCircular from '../progress/ProgressCircular'

export default {
  name: 'PullToWrapper',
  components: { ProgressCircular, VuePullTo },
  props: {
    root: Boolean,
    pullToRefreshMethod: [ Function ],
    pullToLoadMoreMethod: [ Function ]
  }
}
</script>

<style scoped>

</style>
