<template>
  <aside class="sidebar">
    <side-list v-on="$listeners"/>
  </aside>
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
