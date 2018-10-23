<template>
  <div>
    <v-navigation-drawer
      style="background-color: #fafafa"
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <v-list-tile to="/profile">
          <v-list-tile-action>
            <v-icon>fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Моя биография</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/">
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
      clipped-left
      fixed
      dense
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="ml-0">Библиография</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/signIn">
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    drawer: true
  })
}
</script>

<style scoped>

</style>
