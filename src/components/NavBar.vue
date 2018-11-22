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
        <v-list-tile v-if="isAuthenticated" to="/profile">
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>
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
            <v-btn flat class="white--text" slot="activator">
              {{firstName}}
              <v-icon right dark>fas fa-user</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="goto('/profile')">
                <v-list-tile-action>
                  <v-icon>fas fa-home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Моя биография</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="goto('/edit/profile')">
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
        <v-btn v-else icon @click="goto('/signIn')">
          <v-icon>fas fa-sign-in-alt</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VListTile from 'vuetify/lib/components/VList/VListTile'

export default {
  name: 'NavBar',
  components: { VListTile },
  data: () => ({
    drawer: true
  }),
  computed: {
    ...mapGetters([
      'getBiographyByUsername',
      'isAuthenticated',
      'getUsername'
    ]),
    showProfile () {
      return this.isAuthenticated
    },
    firstName () {
      let biography = this.getBiographyByUsername(this.getUsername)

      return biography ? biography.firstName : null
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
    },
    goto (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>

</style>
