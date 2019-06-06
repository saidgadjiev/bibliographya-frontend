<template>
  <div>
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
        <v-list-tile to="/categories">
          <v-list-tile-action>
            <v-icon size="24">mdi-library-books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Библиотека</v-list-tile-title>
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
        <v-list-tile to="/created" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon size="24">fas fa-list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Созданные мной</v-list-tile-title>
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
        <v-list-tile v-if="isAuthenticated && isAuthorized([Roles.ROLE_USER])" to="/settings">
          <v-list-tile-action>
            <v-icon size="24">fas fa-cog</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Настройки</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/bug">
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
    <v-list dense class="grey lighten-4" :class="{'pt-0': $vuetify.breakpoint.smAndDown}">
      <v-list-tile to="/reviews">
        <v-list-tile-action>
          <v-icon>fas fa-clipboard-list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Отзывы</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/feedback">
        <v-list-tile-action>
          <v-icon>mdi-thumbs-up-down</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Обратная связь</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/about">
        <v-list-tile-action>
          <v-icon>fas fa-question-circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>О нас</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :href="_intent" v-if="_isSupportedBrowser">
        <v-list-tile-action>
          <v-icon>fas fa-external-link-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Открыть в приложении</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <template v-if="$vuetify.breakpoint.smAndDown">
        <v-list-tile v-if="isAuthenticated" @click="signOut">
          <v-list-tile-action>
            <progress-circular v-if="_isRequest(Request.SIGN_OUT)" :size="20"/>
            <v-icon v-else>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Выход</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-else>
          <v-list-tile v-if="_isConfirmation" @click="cancelSignUp">
            <v-list-tile-action>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Выход</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-else>
          <v-list-tile to="/signIn">
            <v-list-tile-action>
              <v-icon>fas fa-sign-in-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Войти</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/signUp">
            <v-list-tile-action>
              <v-icon>fas fa-user-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Регистрация</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        </template>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProgressCircular from '../../components/progress/ProgressCircular'
import request from '../../mixins/request'
import alert from '../../mixins/alert'
import authorize from '../../mixins/authorize'
import { SIGN_OUT, CANCEL_SIGN_UP } from '../../store/action-types'
import nativeApp from '../../mixins/native-app'

export default {
  name: 'NavList',
  components: { ProgressCircular },
  mixins: [request, alert, authorize, nativeApp],
  computed: {
    ...mapGetters([
      'getUserId',
      'getFirstName',
      'getLastName',
      'drawer'
    ]),
    _showDeveloperBlock () {
      return this.isAuthorized([this.Roles.ROLE_DEVELOPER])
    },
    _showModeratorBlock () {
      return this.isAuthorized([this.Roles.ROLE_MODERATOR])
    },
    _showAdminBlock () {
      return this.isAuthorized([this.Roles.ROLE_ADMIN])
    },
    _isConfirmation () {
      return this.$route.name === 'signUpConfirm'
    }
  },
  methods: {
    cancelSignUp () {
      this.$store.dispatch(CANCEL_SIGN_UP)
      this.$router.push('/')
    },
    signOut () {
      let that = this

      this.$store.dispatch(SIGN_OUT)
        .then(
          () => {
            this.$router.push('/signIn')
          },
          e => {
            if (e.response.status === that.HttpStatus.UNAUTHORIZED) {
              this.$router.push('/signIn')
            }
          }
        )
    }
  }
}
</script>

<style scoped>

  .user-name {
    word-break: break-all !important;
  }

</style>
