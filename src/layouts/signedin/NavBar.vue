<template>
  <v-navigation-drawer
    :class="[ $vuetify.breakpoint.mdAndUp ? 'md-drawer': 'grey lighten-4' ]"
    :fixed="$vuetify.breakpoint.smAndDown"
    :app="$vuetify.breakpoint.smAndDown"
    v-model="_drawer"
  >
    <v-toolbar flat class="transparent pt-3 pb-3" v-if="$vuetify.breakpoint.smAndDown && isAuthenticated">
      <div>
        <span class="font-weight-light headline user-name">{{ _fullName }}</span>
      </div>
    </v-toolbar>
    <v-list dense class="white">
      <v-list dense>
        <v-list-tile v-if="isAuthenticated" :to="'/profile/' + getUserId">
          <v-list-tile-action>
            <v-icon size="24">fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Моя биография</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" to="/settings">
          <v-list-tile-action>
            <v-icon size="24">fas fa-cog</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Настройки</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/categories">
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
        <v-list-tile to="/create/bug" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon size="24">fas fa-bug</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Сообщить об ошибке</v-list-tile-title>
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
      <v-list dense subheader v-if="_showDeveloperBlock">
        <v-subheader>Разработка</v-subheader>
        <v-list-tile to="/bug/tracking">
          <v-list-tile-action>
            <v-icon size="24">fas fa-bug</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Баг трекинг</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense subheader v-if="_showAdminBlock">
        <v-subheader>Администрирование</v-subheader>
        <v-list-tile to="/categories/admin">
          <v-list-tile-action>
            <v-icon size="24">fas fa-landmark</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Категории</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
            <v-icon size="24">fas fa-chart-bar</v-icon>
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
          <progress-circular v-if="_isRequest(Request.SIGN_OUT)" :size="20"/>
          <v-icon v-else>fas fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Выход</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { ROLES } from '../../config'
import { SIGN_OUT } from '../../store/action-types'
import ProgressCircular from '../../components/progress/ProgressCircular'
import request from '../../mixins/request'

export default {
  name: 'NavBar',
  components: { ProgressCircular },
  mixins: [request],
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getFirstName',
      'getLastName',
      'isAuthenticated',
      'isAuthorized'
    ]),
    _fullName () {
      return this.getFirstName + ' ' + this.getLastName
    },
    _showDeveloperBlock () {
      return this.isAuthorized([ROLES.ROLE_DEVELOPER])
    },
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
      this.$store.dispatch(SIGN_OUT)
        .then(
          () => {
            this.$router.push('/signIn')
          },
          e => {}
        )
    }
  }
}
</script>

<style scoped>
  .user-name {
    word-break: break-all !important;
  }

  .md-drawer {
    height: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
    background-color: inherit !important;
  }

</style>
