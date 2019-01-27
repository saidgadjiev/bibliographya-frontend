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
  name: 'SideBar',
  components: { SideList }
}
</script>

<style scoped>
</style>
