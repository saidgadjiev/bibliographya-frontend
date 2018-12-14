<template>
    <v-navigation-drawer
      :width="240"
      :height="null"
      style="z-index: inherit"
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
        <v-list-tile to="/create/biography">
          <v-list-tile-action>
            <v-icon>fas fa-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Создать биографию</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/created">
          <v-list-tile-action>
            <v-icon>fas fa-list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Созданные мной</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/moderation">
          <v-list-tile-action>
            <v-icon>fas fa-shield-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>На модерации</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters([
      'getUser',
      'isAuthenticated'
    ])
  },
  methods: {
    goto (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>

</style>
