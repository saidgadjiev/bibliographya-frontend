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
        <v-list dense>
        <v-list-tile v-if="isAuthenticated" to="/profile">
          <v-list-tile-action>
            <v-icon size="24">fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Моя биография</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon size="24">mdi-library-books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Библиография</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/biographies">
          <v-list-tile-action>
            <v-icon size="24">mdi-book-open-page-variant</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Биографии</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/create/biography" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon size="24">fas fa-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Создать биографию</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/created" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon size="24">fas fa-list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Созданные мной</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </v-list>
        <!--<v-list-tile to="/complaints">
          <v-list-tile-action>
            <v-icon>fas fa-info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Жалобы</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>-->
        <v-list dense subheader v-if="_showModeratorBlock">
          <v-subheader>Модерация</v-subheader>
          <v-list-tile to="/moderation">
            <v-list-tile-action>
              <v-icon size="24">fas fa-shield-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Модерация</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/fixes">
            <v-list-tile-action>
              <v-icon size="24">fas fa-wrench</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Исправления</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list dense subheader v-if="_showAdminBlock">
          <v-subheader>Администрирование</v-subheader>
          <v-list-tile to="/users">
            <v-list-tile-action>
              <v-icon size="24">fas fa-users-cog</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Пользователи</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/statistics">
            <v-list-tile-action>
              <v-icon size="24">fas fa-clipboard-list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Статистика</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-list>
    <v-list v-if="$vuetify.breakpoint.smAndDown">
      <v-list-tile v-if="isAuthenticated" @click="signOut">
        <v-list-tile-action>
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Выход</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-else to="/signIn">
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
import { ROLES } from '../config'

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
      'isAuthenticated',
      'isAuthorized'
    ]),
    _showModeratorBlock () {
      return this.isAuthorized([ROLES.ROLE_MODERATOR])
    },
    _showAdminBlock () {
      return this.isAuthorized([ROLES.ROLE_ADMIN])
    },
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
