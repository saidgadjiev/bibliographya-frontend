<template>
  <v-navigation-drawer
    class="md-drawer"
    fixed
  >
    <nav-list v-on="$listeners"/>
  </v-navigation-drawer>
</template>

<script>
import NavList from './NavList'

export default {
  name: 'NavBar',
  components: {
    NavList
  }
}
</script>

<style scoped>
  .md-drawer {
    height: auto !important;
    top: auto !important;
    z-index: inherit;
    width: 230px !important;
    left: unset !important;
  }
</style>
