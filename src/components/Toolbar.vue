<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    clipped-left
    clipped-right
    fixed
    dense
  >
    <v-toolbar-title class="ml-0">
      <a class="white--text" @click="$router.push('/')">Библиография</a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu
        v-if="isAuthenticated"
        min-width="200px"
        offset-y
        origin="center center"
        transition="scale-transition"
      >
        <v-btn flat class="white--text" slot="activator" style="text-transform: none">
          {{ _firstName }}
          <v-icon right dark>fas fa-user</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="$router.push('/profile')">
            <v-list-tile-action>
              <v-icon>fas fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Моя биография</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/edit/profile')">
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Редактировать</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="signOut">
            <v-list-tile-action>
              <v-icon>fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn v-else icon @click="$router.push('/signIn')">
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Toolbar',
  computed: {
    ...mapGetters([
      'getUser',
      'isAuthenticated'
    ]),
    _firstName () {
      return this.getUser.biography.firstName
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
        .then(
          () => {
            this.$router.push('/signIn')
          },
          e => {
            console.log(e)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
