<template>
  <aside class="sidebar">
    <side-card v-on="$listeners" v-bind="$attrs"></side-card>
  </aside>
</template>

<script>
import SideCard from './SideCard'
export default {
  name: 'SideBar',
  inheritAttrs: false,
  components: { SideCard }
}
</script>

<style scoped>
</style>
