<template>
  <v-navigation-drawer
    class="sidebar"
    fixed
  >
    <side-list v-on="$listeners"/>
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
    width: 230px !important;
    left: unset !important;
    background-color: inherit !important;
  }
</style>
