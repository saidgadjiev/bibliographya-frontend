<template>
  <div class="sidebar transparent">
    <side-list v-on="$listeners"/>
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
