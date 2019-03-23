<template>
  <vue-pull-to
    :bottom-load-method="loadMore"
    @bottom-state-change="stateChange"
  >
    <slot></slot>
    <template slot="bottom-block">
      <div class="bottom-load-wrapper">
        Pull to
      </div>
    </template>
  </vue-pull-to>
</template>

<script>
import VuePullTo from 'vue-pull-to/src/vue-pull-to'

export default {
  name: 'PullToWrapper',
  components: { VuePullTo },
  methods: {
    loadMore (loaded) {
      loaded('done')
    },
    stateChange (state) {
      console.log(state)
    }
  }
}
</script>

<style scoped>

</style>
