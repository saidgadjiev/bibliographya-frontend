<template>
  <v-navigation-drawer
    class="sidebar"
    fixed
  >
    <side-card v-on="$listeners" v-bind="$attrs"></side-card>
  </v-navigation-drawer>
</template>

<script>
import SideCard from './SideCard'
export default {
  name: 'SideBar',
  inheritAttrs: false,
  components: { SideCard }
}
</script>

<style scoped>
</style>
