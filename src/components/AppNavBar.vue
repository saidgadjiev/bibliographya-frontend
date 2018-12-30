<template>
  <v-navigation-drawer
    :class="[ $vuetify.breakpoint.mdAndUp ? 'md-drawer': 'grey lighten-4' ]"
    :fixed="$vuetify.breakpoint.smAndDown"
    :app="$vuetify.breakpoint.smAndDown"
    v-model="_drawer"
  >
    <v-toolbar flat class="transparent pt-3 pb-3" v-if="$vuetify.breakpoint.smAndDown && isAuthenticated">
      <div>
        <span class="font-weight-light headline user-name">Гаджиев Саид</span>
      </div>
    </v-toolbar>
      <v-list dense class="white">
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
        <v-list-tile to="/fixes">
          <v-list-tile-action>
            <v-icon>fas fa-wrench</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Исправления</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    <v-list v-if="$vuetify.breakpoint.smAndDown">
      <v-list-tile v-if="isAuthenticated">
        <v-list-tile-action>
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Выход</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-else>
        <v-list-tile-action>
          <v-icon>fas fa-sign-in-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Войти</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'isAuthenticated'
    ]),
    _drawer: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$emit('update:drawer', val)
      }
    }
  },
  methods: {
    goto (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
  .user-name {
    word-break: break-word !important;
  }
  .md-drawer {
    height: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
    background-color: inherit !important;
  }

</style>
