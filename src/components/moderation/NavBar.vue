<template>
  <v-navigation-drawer
    floating
    permanent
    stateless
    right
    app
    height="100px"
    value="true"
    style="margin-top: 80px"
  >
    <v-list dense>
      <v-list-tile
        href=""
        @click="$emit('assigned-me')"
      >
        <v-list-tile-content>
          <v-list-tile-title>Назначенные мне</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>

</style>
