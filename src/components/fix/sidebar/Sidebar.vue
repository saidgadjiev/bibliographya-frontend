<template>
  <v-navigation-drawer
    class="sidebar"
    fixed
  >
    <side-list v-on="$listeners"></side-list>
  </v-navigation-drawer>
</template>

<script>
import SideList from './SideList'
export default {
  name: 'Sidebar',
  components: { SideList }
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
