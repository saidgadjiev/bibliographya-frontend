<template>
  <v-navigation-drawer
    class="sidebar transparent"
    fixed
  >
    <side-list v-on="$listeners"/>
  </v-navigation-drawer>
</template>

<script>
import SideList from './SideList'

export default {
  name: 'SideBar',
  components: { SideList }
}
</script>

<style scoped>

  .transparent {
    background-color: transparent !important;
  }
</style>
