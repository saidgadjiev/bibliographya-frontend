<template>
  <v-navigation-drawer
    class="md-drawer"
    fixed
  >
    <side-card v-on="$listeners" v-bind="$attrs"></side-card>
  </v-navigation-drawer>
</template>

<script>
import SideCard from './SideCard'
export default {
  name: 'Sidebar',
  inheritAttrs: false,
  components: { SideCard }
}
</script>

<style scoped>
  .md-drawer {
    height: auto !important;
    top: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
  }
</style>
