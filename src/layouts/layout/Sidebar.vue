<template>
  <aside class="md-drawer">
    <nav-list/>
  </aside>
</template>

<script>
import NavList from './NavList'
export default {
  name: 'Sidebar',
  components: { NavList }
}
</script>

<style scoped>
  .md-drawer {
    transform: none !important;
    height: auto !important;
    z-index: inherit;
    width: 228px !important;
    left: unset !important;
    background-color: inherit !important;
  }

</style>
