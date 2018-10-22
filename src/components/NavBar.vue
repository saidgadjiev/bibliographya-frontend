<template>
  <v-navigation-drawer
    clipped
    permanent
    app
    style="background-color: #fafafa; height: 80px"
  >
    <v-list dense>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>fas fa-home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Моя биография</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>far fa-newspaper</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Биографии</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    fixed
    clipped-left
  >
    <v-toolbar-title>Библиография</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>

</style>
