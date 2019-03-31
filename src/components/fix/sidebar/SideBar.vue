<template>
  <div class="sidebar">
    <side-list v-on="$listeners"></side-list>
  </div>
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
